<template>
    <!--
        Triggers immediately after window closes.
        @event close
    -->
    <!--
        Triggers immediately after window opens.
        @event open
    -->
    <transition name="fade" @after-leave="$emit('close')" @after-enter="$emit('open')">
        <aim-container
            v-show="isOpen"
            flex
            wrappedBy="window" 
            :style="styleWindow"
            ref="window"
            @mousedown="activate"
            @touchstart="activate"
        >
            <aim-headerbar headerFor="window" :title="title" ref="headerbar">
                <template v-slot:actions>
                    <aim-button-group>
                        <aim-button @click="toggleCollapse">
                            <i class="fas fa-window-minimize" aria-hidden="true"></i>
                        </aim-button>
                        <aim-button v-if="!hideCloseButton" @click="toggleClose">
                            <i class="fas fa-times" aria-hidden="true"></i>
                        </aim-button>
                    </aim-button-group>
                </template>
            </aim-headerbar>
            <aim-row
                v-show="!isCollapsed"
                flexItem="fill"
                ref="content"
                :style="styleContent"
            >
                <slot />
            </aim-row>
        </aim-container>
    </transition>
</template>

<script>
import { hasFlex, getRect, naturalSize,
    setupDefaultWidth, setupDefaultHeight } from "../../window/dom";
import { DraggableHelper } from "../../window/draggable-helper";
import { ResizableHelper } from "../../window/resizable-helper";
import { ZElement } from "../../window/z-element";

import { OVERFLOW_OPTIONS } from '../../utils/constants';
import { arrayIncludes } from '../../utils/array';
import { isUndefinedOrNull, isNumber } from '../../utils/inspect';
import { distance2, clamp } from '../../utils/math';

import AimRow from '../layout/row';
import AimButton from '../button/button';
import AimButtonGroup from '../button-group/button-group';
import AimHeaderbar from '../headerbar/headerbar';

/**
 * @typedef Rect
 * @type {object}
 * @property {number} left
 * @property {number} top
 * @property {number} width
 * @property {number} height
 */

const POSITION_HINT_AUTO = 'auto';
const POSITION_HINT_CENTER = 'center';
const POSITION_HINT_OPTIONS = [
    POSITION_HINT_AUTO,
    POSITION_HINT_CENTER
];
const instances = [];

/**
 * Get top left dimensions from Vue component.
 * 
 * @type {Vue} vue
 */
function getLeftTopDimensions(vue) {
    let { left, top } = vue;
    if(isNumber(left) && isNumber(top)) return { left, top };

    const el = vue.windowElement();
    ({ left, top } = getRect(el));
    return { left, top };
}

/**
 * Floating Window.
 * The window can be moved by dragging the window's header.
 * The window can be resized by dragging the window's edges if `resizable` is set.
 * The window can be minimized or closed using buttons on the right hand corner.
 * 
 * Based on `vue-window`.
 * 
 * Outstanding bugs:
 * 
 * There is a problem automatically setting the window's initial height (i.e. when `initHeight` and `minHeight` are not set) when the window HTML element has flex styling on it.
 * 
 * There is a problem automatically setting the window's initial width (i.e. when `initWidth` and `minWidth` are not set) since headerbar gets squished.
 * 
 * Sometimes the window is not placed exactly in the center when using positionHint 'center'. Should fix initial window centering.
 * 
 * Windows of different initial width/height and same `positionHint` are not placed in a cascading manner.
 * 
 * 
 * @see https://michitaro.github.io/vue-window/
 * @todo fix automatically setting the window's initial height
 * @todo fix automatically setting the window's initial width
 * @todo fix initial window centering
 * @todo fix toggle scrolling
 */
export default {
    name: 'AimWindowMenu',
    components: {
        AimRow,
        AimButton,
        AimButtonGroup,
        AimHeaderbar,
    },
     model: {
        prop: 'isOpen',
        event: 'update:isOpen'
    },
    props: {
        /**
         * Text to place in window header.
         */
        title: {
            type: String,
            default: '',
        },
        /**
         * Window is shown when true, and hidden otherwise.
         * @model
         */
        isOpen: {
            type: Boolean,
            default: true,
        },
        /**
         * Whether resizing the window is enabled.
         */
        resizable: {
            type: Boolean,
            default: false,
        },
        /**
         * Move the window in front of all the other windows when the window is open. 
         */
        activateWhenOpen: {
            type: Boolean,
            default: true,
        },
        /**
         * Whether to show the close button for the window.
         */
        hideCloseButton: {
            type: Boolean,
            default: false,
        },
        /**
         * If `initLeft` and `initTop` are not set, then choose how to automatically set the initial position of the window.
         * @values 'auto', 'center'
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/position
         */
        positionHint: {
            type: String,
            default: 'auto',
            validator: str => arrayIncludes(POSITION_HINT_OPTIONS, str)
        },
        /**
         * The z-index group to put the window in. Based on `vue-window` z-index groups.
         * @see https://michitaro.github.io/vue-window
         */
        zGroup: {
            type: Number,
            default: 0,
        },
        /**
         * Set what happens content overflows the bottom of the container.
         * @values 'visible', 'hidden', 'scroll', 'auto'
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
         */
        overflow: {
            type: String,
            default: 'hidden',
            validator: str => arrayIncludes(OVERFLOW_OPTIONS, str)
        },
        /**
         * Initial left position to place window in respect to topleft browser viewport.
         */
        initLeft: {
            type: Number,
            default: null,
        },
        /**
         * Initial top position to place window in respect to topleft browser viewport.
         */
        initTop: {
            type: Number,
            default: null,
        },
        /**
         * Initial window width.
         */
        initWidth: {
            type: Number,
            default: null,
        },
        /**
         * Initial window height.
         */
        initHeight: {
            type: Number,
            default: null,
        },
        /**
         * Minimum window width.
         */
        minWidth: {
            type: Number,
            default: null,
        },
        /**
         * Minimum window height.
         */
        minHeight: {
            type: Number,
            default: null,
        },
        /**
         * Maximum window width.
         */
        maxWidth: {
            type: Number,
            default: null,
        },
        /**
         * Maximum window height.
         */
        maxHeight: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            zIndex: 'auto',
            /**
             * @type {DraggableHelper}
             */
            draggableHelper: null,
            /**
             * @type {ResizableHelper}
             */
            resizableHelper: null,
            /**
             * @type {ZElement}
             */
            zElement: null,
            /**
             * @type {number}
             */
            openCount: 0,
            isCollapsed: false,
            /**
             * window left styling is maintained as data 
             * @type {number}
             */
            left:   this.initLeft,
            top:    this.initTop,
            width:  this.initWidth,
            height: this.initHeight,
            savedHeight: this.initHeight,
        };
    },
    computed: {
        styleWindow() {
            const left = isNumber(this.left) ? `${this.left}px` : this.left;
            const top = isNumber(this.top) ? `${this.top}px` : this.top;
            const width = isNumber(this.width) ? `${this.width}px` : this.width;
            const height = isNumber(this.height) ? `${this.height}px` : this.height;
            return {
                zIndex: `${this.zIndex}`,
                left, top, width, height,
            };
        },
        styleContent() {
            return {
                overflowY: this.overflow
            };
        },
        hasHeight() { return isNumber(this.height) && this.height > 0; },
        hasWidth()  { return isNumber(this.width) && this.width > 0; },
        hasMinHeight() { return isNumber(this.minHeight) && this.minHeight > 0; },
        hasMaxHeight() { return isNumber(this.maxHeight) && this.maxHeight > 0; },
        hasMinWidth()  { return isNumber(this.minWidth) && this.minWidth > 0; },
        hasMaxWidth()  { return isNumber(this.maxWidth) && this.maxWidth > 0; },
    },
    methods: {
        windowElement()    { return this.$refs.window; },
        headerbarElement() { return this.$refs.headerbar; },
        contentElement()   { return this.$refs.content; },
        getLeftBounds() {
            return {
                lower: 0, 
                upper: window.innerWidth - this.width,
            };
        },
        getTopBounds() {
            return {
                lower: 0,
                upper: window.innerHeight - this.height,
            };
        },
        getHeightBounds() {
            const h = this.headerbarElement();
            const { height: hHeight } = getRect(h);
            let lower = Math.max(this.hasMinHeight ? this.minHeight : 0, hHeight);
            let upper = this.hasMaxHeight ? this.maxHeight : window.innerHeight;
            upper = Math.min(upper, window.innerHeight - this.top);
            return { lower, upper };
        },
        getWidthBounds() {
            let computedWidth;
            let upperBoundWidth;
            let lower = this.hasMinWidth ? this.minWidth : 0;
            let upper = this.hasMaxWidth ? this.maxWidth : window.innerWidth;
            upper = Math.min(upper, window.innerWidth - this.left);
            return { lower, upper };
        },
        /**
         * Set the top, clamping it with 0 and window.innerWidth.
         * @param {number} left
         */
        setWindowLeft(left) {
            this.left = clamp(left, this.getLeftBounds());
        },
        /**
         * Set the top, clamping it with 0 and window.innerHeight.
         * @param {number} top
         */
        setWindowTop(top) {
            this.top = clamp(top, this.getTopBounds());
        },
        /**
         * Set the height, clamping it with header height, minHeight, maxHeight, and window.innerHeight.
         * Use setWindowHeight() instead of setting height data directly.
         * @param {number} height
         */
        setWindowHeight(height) {
            if(this.isCollapsed) {
                const h = this.headerbarElement();
                const { height: hHeight } = getRect(h);
                this.height = hHeight;
            } else {
                this.height = clamp(height, this.getHeightBounds());
            }
        },
        /**
         * Set the width, clamping it with 0, minWidth, maxWidth, and window.innerHeight.
         * @param {number} width
         * @todo set a lower bound width not 0
         */
        setWindowWidth(width) {
            this.width = clamp(width, this.getWidthBounds());
        },
        /**
         * API to set the window container dimensions. This is passed to helpers that set window dimensions.
         */
        setWindowDimensions({ width, height, top, left }) {
            const w = this.windowElement();
            if(isNumber(left))   this.setWindowLeft(left);
            if(isNumber(top))    this.setWindowTop(top);
            if(isNumber(height)) this.setWindowHeight(height);
            if(isNumber(width))  this.setWindowWidth(width);
        },
        /**
         * API to get the window container dimensions. This is passed to helpers that set window dimensions.
         */
        getWindowDimensions() {
            return { width: this.width, height: this.height,
                    left: this.left, top: this.top };
        },
        fixPosition() {
            this.setWindowDimensions(this);
        },
        /**
         * raise window to the front of the browser
         */
        activate() {
            this.zElement.raise();
            /**
             * Triggers when window is raised to the front of the browser (window's z-index is set to the highest).
             * @event activate
             */
            this.$emit('activate');
        },
        /**
         * Creates draggable helper to to move window when draggine handlebar
         */
        createDraggableHelper() {
            return new DraggableHelper(
                this.headerbarElement(),
                this.windowElement(),
                {
                    setDimensions: (rect) => this.setWindowDimensions(rect),
                    getDimensions: () => this.getWindowDimensions(),
                    onMoveStart: () => {
                        /**
                         * Triggers when user has started dragging the window.
                         * @event move-start
                         */
                        this.$emit('move-start')
                    },
                    onMoveEnd: () => {
                        /**
                         * Triggers when user has stopped dragging the window.
                         * @event move-end
                         */
                        this.$emit('move-end')
                    },
                }
            );
        },
        /**
         * Creates resizable helper to resize window when dragging edges
         */
        createResizeHelper() {
            return new ResizableHelper(
                this.windowElement(),
                {
                    setDimensions: (rect) => this.setWindowDimensions(rect),
                    getDimensions: () => this.getWindowDimensions(),
                    getTopBounds: () => this.getTopBounds(),
                    getLeftBounds: () => this.getLeftBounds(),
                    getHeightBounds: () => this.getHeightBounds(),
                    getWidthBounds: () => this.getWidthBounds(),
                    onResizeStart: () => {
                        /**
                         * Triggers when user has started resizing the window.
                         * @event resize-start
                         */
                        this.$emit('resize-start');
                    },
                    onResizeEnd: () => {
                        /**
                         * Triggers when user has stopped resizing the window.
                         * @event move-end
                         */
                        this.$emit('resize-end')
                    },
                }
            );
        },
        setupOpen() {
            this.$nextTick(() => {
                if(this.openCount++ == 0) this.setInitialPosition();
                this.draggableHelper = this.createDraggableHelper();
                if(this.resizable) this.createResizeHelper();
            });
            if(this.activateWhenOpen) this.activate();
        },
        /**
         * Tears down helpers
         */
        teardownClose() {
            if(this.resizableHelper) this.resizableHelper.teardown();
            if(this.draggableHelper) this.draggableHelper.teardown();
        },
        /**
         * call setupOpen or teardownClose depending on whether window is open.
         */
        onIsOpenChange(isOpen) {
            if (isOpen) this.setupOpen();
            else this.teardownClose();
        },
        onZGroupChange() {
            this.zElement.group = this.zGroup;
        },
        onIsCollapseChange(isCollapsed) {
            if(isCollapsed) {
                this.savedHeight = this.height;
                this.setWindowHeight();
            } else {
                this.$nextTick(() => {
                    this.setWindowHeight(this.savedHeight);
                });
            }
        },
        positionIsFree(x, y) {
            return instances.every((vue) => {
                if(!vue.isOpen || this === vue) return true;
                const { left, top } = getLeftTopDimensions(vue);
                return distance2(left, top, x, y) > 16
            });
        },
        setInitialLeftPosition(width, height) {
            let x = 80;
            let y = 80;
            let i = 0;
            while(i++ < 100) {
                if(this.positionIsFree(x, y)) break;
                x = (x + 40) % (window.innerWidth - width);
                y = (y + 40) % (window.innerHeight - height);
            }
            return { left: x, top: y };
        },
        setInitialCenterPosition(width, height) {
            let x = (window.innerWidth - width) / 2;
            let y = (window.innerHeight - height) / 2;
            let i = 0;
            while(i++ < 100) {
                if(this.positionIsFree(x, y)) break;
                x = (x + 20) % (window.innerWidth - width);
                y = (y + 5) % (window.innerHeight - height);
            }
            return { left: x, top: y };
        },
        /**
         * Set window position (left, top) using inference.
         */
        setInitialPosition() {
            const el = this.windowElement();
            let width = this.hasWidth ? this.width : setupDefaultWidth(el);
            let height = this.hasHeight ? this.height : setupDefaultHeight(el);
            let left = this.left;
            let top  = this.top;
            if(isUndefinedOrNull(left) !== isUndefinedOrNull(top)) {
                throw new Error(`Either of left or top is specified. Both must be set or not set.`);
            } else if(isUndefinedOrNull(left) == true && isUndefinedOrNull(top) == true) {
                if(this.positionHint === POSITION_HINT_AUTO) {
                    ({ left, top } = this.setInitialLeftPosition(width, height));
                } else if(this.positionHint === POSITION_HINT_CENTER) {
                    ({ left, top } = this.setInitialCenterPosition(width, height));
                } else {
                    throw new Error(`invalid position hint ${this.positionHint}`);
                }
            }
            this.setWindowDimensions({ left, top, width, height });
        },
        toggleClose() {
            /**
             * Triggers when something tries to close window.
             * Used for v-model
             * 
             * @emit update:isOpen
             * @type {boolean}
             */
            this.$emit('update:isOpen', false)
        },
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
    watch: {
        isOpen: { handler: 'onIsOpenChange' },
        isCollapsed: { handler: 'onIsCollapseChange' },
        zGroup: { handler: 'onZGroupChange' },
    },
    mounted() {
        instances.push(this);
        this.zElement = new ZElement(this.zGroup,
            zIndex => this.zIndex = zIndex);
        this.onIsOpenChange(this.isOpen);
        this.resizehandler = e => this.fixPosition();
        window.addEventListener('resize', this.resizehandler);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizehandler);
        this.teardownClose();
        this.zElement.unregister();
        instances.splice(instances.indexOf(this), 1);
    }
}
</script>
