import { isUndefinedOrNull, isNumber } from '../../../utils/inspect';
import { SinglePointerEvent } from '../../../window/single-pointer-event';
import { naturalSize, hasFlex, getRect } from '../../../window/dom';
import {
    LAYOUT_HORIZONTAL,
    LAYOUT_VERTICAL,
    PANE_OPTIONS
} from '../../../utils/constants';

export class ResizeHelper {
    /**
     * 
     * @param {number} i index of pane this resize helper resizes
     * @param {number} n number of panes in pane container
     * @param {HTMLElement} resizer HTML element that acts as the resizer
     * @param {*} leftContainer 
     * @param {*} rightContainer 
     * @param {*} layout 
     * @param {*} options 
     */
    constructor(i, n, resizer, leftContainer,
            rightContainer, layout, options) {
        this.i = i;
        this.n = n;
        this.resizer = resizer;
        this.leftContainer = leftContainer;
        this.rightContainer = rightContainer;
        this.layout = layout;
        this.options = options;

        /**
         * @param {SinglePointerEvent} e 
         */
        this.mousemove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            const style = this.containerToModify.style;
            const resizeFactor = this.containerToModify === this.leftContainer ? 1 : -1;
            if(this.layout == LAYOUT_VERTICAL) {
                let width = this.initialLength + 
                        resizeFactor*(e.clientX - this.initialOffset);
                const maxWidth = options.maxWidth || window.innerWidth;
                const minWidth = options.minWidth || 0;
                width = Math.max(minWidth, Math.min(maxWidth, width));
                style.width = `${width}px`;
            } else {
                let height = this.initialLength + 
                        resizeFactor*(e.clientY - this.initialOffset);
                const maxHeight = options.maxHeight || window.innerHeight;
                const minHeight = options.minWidth || 0;
                height = Math.max(minHeight, Math.min(maxHeight, height));
                style.height = `${height}px`;
            }
            this.options.onResize && this.options.onResize(this.i);
        };

        this.mouseup = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.options.onResizeEnd && this.options.onResizeEnd(this.i);
            this.unbindUp()
            this.unbindMove()
            this.unbindUp = this.unbindMove = undefined
        };

        this.mousedown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            if(this.shouldResizeRight) {
                if(this.isRightCollapsed) return;
                this.containerToModify = this.rightContainer;
            } else {
                if(this.isLeftCollapsed) return;
                this.containerToModify = this.leftContainer;
            }
            const { width, height } = getRect(this.containerToModify);
            if(this.layout == LAYOUT_VERTICAL) {
                this.initialLength = width;
                this.initialOffset = e.clientX;
            } else {
                this.initialLength = height;
                this.initialOffset = e.clientY;
            }
            this.options.onResizeStart && this.options.onResizeStart(this.i);
            this.unbindMove = SinglePointerEvent.bindMove(document, this.mousemove); 
            this.unbindUp = SinglePointerEvent.bindUp(document, this.mouseup);
        }

        this.unbindDown = SinglePointerEvent.bindDown(this.resizer, this.mousedown);
    }

    get shouldResizeRight() {
        const flexPaneIndex = this.options.flexPaneIndex;
        return (isUndefinedOrNull(flexPaneIndex) && this.i == this.n - 1) ||
                flexPaneIndex <= this.i;
    }

    get isLeftCollapsed() {
        return this.options && !this.options.isOpen(this.i);
    }

    get isRightCollapsed() {
        return this.options && !this.options.isOpen(this.i + 1);
    }

    tearDown() {
        this.unbindDown();
        this.unbindUp && this.unbindUp();
        this.unbindMove && this.unbindMove();
    }
}

export const filterTaggedSlots = (slots, name) => slots[name].filter(slot => !isUndefinedOrNull(slot.tag));