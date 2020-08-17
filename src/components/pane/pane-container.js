import Vue from 'vue';
import { isArray, arrayIncludes } from '../../utils/array';
import { isUndefinedOrNull, isNumber } from '../../utils/inspect';
import AimPaneResizer from './pane-resizer';
import { clamp } from '../../utils/math';
import {
    LAYOUT_HORIZONTAL,
    LAYOUT_VERTICAL,
    PANE_OPTIONS
} from '../../utils/constants';
import { ResizeHelper, filterTaggedSlots } from './helpers/helpers'

/**
 * Container flanked by multiple collapsable `aim-pane-menu` side panes.
 * Each pane is adjustable by dragging the pane resizers between the panes.
 * Each `aim-pane-menu` is collapsable by clicking its close button.
 * Loosely based on `vue-multiplane`.
 * 
 * There is a problem with some renderers like `vue-styleguidist` inserting empty children so a workaround is to use a `filterTaggedSlots()` helper method to filter them out.
 * 
 * Only vertical panes are implemented. Should implement horizontal panes.
 * 
 * @see https://github.com/yansern/vue-multipane
 * @todo implement horizontal panes.
 * @example [none]
 */
export default {
    name: 'AimPaneContainer',
    components: {
        AimPaneResizer,
    },
    provide() {
        return {
            eventBus: null,
        };
    },
    props: {
        /**
         * Choose whether panes are horizontal or vertical panes.
         * @values 'horizontal', 'vertical'
         */
        layout: {
            type: String,
            default: LAYOUT_VERTICAL,
            validator: str => arrayIncludes(PANE_OPTIONS, str)
        },
        /**
         * Specify the index (0-based numbering) of the compoent's children that should be flex content.
         */
        flexPaneIndex: {
            type: Number,
            required: false,
            validator: n => n > -1,
        },
        /**
         * Minimum px width for horizontal panes.
         */
        minWidth: {
            type: [Number, Array],
            default: 100,
        },
        /**
         * Initial px width for horizontal panes.
         */
        initWidth: {
            type: [Number, Array],
            default: 200,
        },
        /**
         * Maximum px width for horizontal panes.
         */
        maxWidth: {
            type: [Number, Array],
            default: 250,
        },
        /**
         * Minimum px height for vertical panes.
         */
        minHeight: {
            type: [Number, Array],
            default: 100,
        },
        /**
         * Initial px height for vertical panes.
         */
        initHeight: {
            type: [Number, Array],
            default: 150,
        },
        /**
         * Initial px height for vertical panes.
         */
        maxHeight: {
            type: [Number, Array],
            default: 200,
        },
        /**
         * Width of minimized pane px width for horizontal panes.
         */
        minimizedWidth: {
            type: Number,
            default: 15,
        },
        /**
         * Width of minimized pane px height for vertical panes.
         */
        minimizedHeight: {
            type: Number,
            default: 15,
        },
    },
    data() {
        const isPaneOpenArray = filterTaggedSlots(this.$slots, 'default')
            .map(slot => true);
        return {
            isResizing: false,
            resizeHelpers: [],
            isPaneOpenArray,
            locks: {
                'pane-resize': false,
            },
        };
    },
    computed: {
        classnames() {
            return [
                'multipane',
                'layout-' + this.layout,
                this.isResizing ? 'is-resizing' : '',
            ];
        },
        cursor() {
            return this.isResizing
                ? this.layout == LAYOUT_VERTICAL ? 'col-resize' : 'row-resize'
                : '';
        },
        userSelect() {
            return this.isResizing ? 'none' : '';
        },
        isVerticalLayout() {
            return this.layout === LAYOUT_VERTICAL;
        },
        numberOfSlots() {
            const slots = filterTaggedSlots(this.$slots, 'default');
            return slots.length;
        }
    },
    methods: {
        onPaneResizeStart(pane) {
            this.isResizing = true;
            this.$nextTick(() => {
                /**
                 * Triggers when user begins dragging a pane resizer.
                 * Emits the index of the pane that resizes.
                 * 
                 * @event pane-resize-start
                 * @type {number}
                 */
                this.$emit('pane-resize-start', pane);
            });
        },
        /**
         * Emits 'pane-resize' event
         * @param {number} pane 
         */
        onPaneResize(pane) {
            if(!this.locks['pane-resize']) {
                this.locks['pane-resize'] = true;
                this.$nextTick(() => {
                    /**
                     * Triggers when user moves mouse when dragging a pane resizer.
                     * Emits the index of the pane that resizes.
                     * 
                     * @event pane-resize
                     * @type {number}
                     */
                    this.$emit('pane-resize', pane);
                });
                window.setTimeout(() => {
                    this.locks['pane-resize'] = false;
                }, 100);
            }
        },
        onPaneResizeEnd(pane) {
            this.isResizing = false;
            this.$nextTick(() => {
                /**
                 * Triggers when user releases a pane resizer.
                 * Emits the index of the pane that resizes.
                 * 
                 * @event pane-resize-end
                 * @type {number}
                 */
                this.$emit('pane-resize-end', pane);
            });
        },
        /**
         * Determines whether pane width should be flex and autosized.
         * @param {number} pane 
         */
        shouldBeFlexPane(pane) {
            return (isUndefinedOrNull(this.flexPaneIndex) && pane === this.numberOfSlots - 1) ||
                    pane === this.flexPaneIndex;
        },
        /**
         * Used in render function to identify pane a resizer corresponds to.
         * @param {number} i 
         */
        shouldResizeRight(i) {
            return (isUndefinedOrNull(this.flexPaneIndex) && i === this.numberOfSlots - 1) ||
                    this.flexPaneIndex <= i;
        },
        isPaneOpen(pane) {
            return this.isPaneOpenArray[pane] || this.shouldBeFlexPane(pane);
        },
        isPaneCollapsed(pane) {
            return !this.isPaneOpenArray[pane] && !this.shouldBeFlexPane(pane);
        },
        getPaneResizer(i) {
            return this.$refs[`pane-resizer-${i}`];
        },
        getLeftPaneWrapper(i) {
            return this.$refs[`pane-wrapper-${i}`];
        },
        getRightPaneWrapper(i) {
            return this.$refs[`pane-wrapper-${i + 1}`];
        },
        initResizeHelpers() {
            for(let i = 0; i < this.numberOfSlots - 1; i++) {
                const resizer = this.getPaneResizer(i);
                const leftWrapper = this.getLeftPaneWrapper(i);
                const rightWrapper = this.getRightPaneWrapper(i);
                const resizeHelper = new ResizeHelper(
                    i, this.numberOfSlots, resizer,
                    leftWrapper,
                    rightWrapper,
                    this.layout,
                    {
                        flexPaneIndex: this.flexPaneIndex,
                        minWidth: this.minWidth,
                        maxWidth: this.maxWidth,
                        minHeight: this.minHeight,
                        maxHeight: this.maxHeight,
                        onResizeStart: (k) => this.onPaneResizeStart(k),
                        onResize: (k) => this.onPaneResize(k),
                        onResizeEnd: (k) => this.onPaneResizeEnd(k),
                        isOpen: (k) => this.isPaneOpen(k),
                    }
                );
                this.resizeHelpers.push(resizeHelper);
            }
        },
        teardownResizeHelpers() {
            this.resizeHelpers.forEach(resizeHelper => resizeHelper.tearDown());
        },
        handleToggleCollapse(pane) {
            this.$set(this.isPaneOpenArray, pane, !this.isPaneOpenArray[pane]);
            this.$nextTick(() => {
                if(this.isPaneOpenArray[pane]) {
                    /**
                     * Triggers that a pane expands from its collapsed form.
                     * Emits the index of the pane that changes.
                     * 
                     * @event pane-open
                     * @type {number}
                     */
                    this.$emit('pane-open', pane);
                } else {
                    /**
                     * Triggers that a pane collapses from its expanded form.
                     * Emits the index of the pane that changes.
                     * 
                     * @event pane-collapse
                     * @type {number}
                     */
                    this.$emit('pane-collapse', pane);
                }
            });
        },
    },
    created() {
        this._provided.eventBus = new Vue();
        this.eventBus = this._provided.eventBus;
        this.eventBus.$on('toggleCollapse', this.handleToggleCollapse);
    },
    mounted() {
        this.initResizeHelpers();
    },
    beforeDestroy() {
        this.eventBus.$off('toggleCollapse', this.handleToggleCollapse);
        this.eventBus.$destroy();
        this.teardownResizeHelpers();
    },
    render(h) {
        const style = { 
            cursor: this.cursor, 
            userSelect: this.userSelect
        };
        const componentData = {
            class: this.classnames,
            style,
        };
        const children = [];
        const slots = filterTaggedSlots(this.$slots, 'default');
        for(let i = 0; i < this.numberOfSlots; i++) {
            if(this.isPaneCollapsed(i)) {
                let wrapperComponentStyle;
                if(this.isVerticalLayout) {
                    wrapperComponentStyle = {
                        width: `${this.minimizedWidth}px`,
                    };
                } else {
                    wrapperComponentStyle = {
                        height: `${this.minimizedHeight}px`,
                    };
                }
                const wrapperComponentOn = {
                    click: () => this.handleToggleCollapse(i),
                };
                const wrapperComponentData = {
                    ref: `pane-wrapper-${i}`,
                    class: [
                        "pane-wrapper",
                        "collapsed"
                    ],
                    style: wrapperComponentStyle,
                    on: wrapperComponentOn,
                };
                children.push(h('div', wrapperComponentData));

            } else {
                let wrapperComponentStyle;
                if(this.shouldBeFlexPane(i)) {
                    wrapperComponentStyle = {
                        flexGrow: 1,
                        flexBasis: 0,
                    };
                } else {
                    if(this.isVerticalLayout) {
                        wrapperComponentStyle = {
                            width: `${clamp(this.initWidth, { upper: this.maxWidth, lower: this.minWidth })}px`,
                        };
                    } else {
                        wrapperComponentStyle = {
                            height: `${clamp(this.initHeight, { upper: this.maxHeight, lower: this.minHeight })}px`,
                        };
                    };
                }
                const wrapperComponentData = {
                    ref: `pane-wrapper-${i}`,
                    class: ["pane-wrapper"],
                    style: wrapperComponentStyle,
                };
                const slot = slots[i];
                slot.key = i;
                children.push(h('div', wrapperComponentData, [slot]));
            }
            
            if(i < this.numberOfSlots - 1) {
                const hide = this.shouldResizeRight(i) ? this.isPaneCollapsed(i + 1) : this.isPaneCollapsed(i);
                const resizerComponentData = {
                    ref: `pane-resizer-${i}`,
                    props: { hide },
                };
                children.push(h('aim-pane-resizer', resizerComponentData));
            }
        }
        return h('div', componentData, children);
    }
};
