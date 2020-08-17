import { clamp } from '../utils/math';
import { naturalSize, getRect } from "./dom"
import { SinglePointerEvent } from './single-pointer-event';

/**
 * @abstract
 */
class HandleBase {
    handleSize = 8;

    createHandleElement() {
        const div = document.createElement('div')
        const style = div.style
        style.position = 'absolute'
        this.applyStyle(style)
        this.container.appendChild(div)
        return div
    }

    setInits(e) {
        const { left, top, width, height } = this.helper.options.getDimensions();
        this.x0 = e.clientX
        this.y0 = e.clientY
        this.left0 = left;
        this.top0 = top;
        this.width0 = width;
        this.height0 = height;
    }

    setClamps(e) {
        const {
            lower: lowerHeight,
            upper: upperHeight
        } = this.helper.options.getHeightBounds();
        this.clampYTop = (e) => {
            return clamp(e.clientY, {
                lower: this.height0 - upperHeight + this.y0,
                upper: this.height0 - lowerHeight + this.y0,
            });
        };
        const {
            lower: lowerWidth,
            upper: upperWidth
        } = this.helper.options.getWidthBounds();
        this.clampXLeft = (e) => {
            return clamp(e.clientX, {
                lower: this.width0 - upperWidth + this.x0,
                upper: this.width0 - lowerWidth + this.x0,
            });
        }
    }

    /**
     * @param {HTMLElement} container
     * @param {ResizableHelper} helper
     */
    constructor(container, helper) {
        this.container = container;
        this.helper    = helper;

        this.mousemove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setPosition(e);
            if(this.helper.options.onResize) this.helper.options.onResize();
        }

        this.mouseup = (e) => {
            e.preventDefault()
            e.stopPropagation()
            if(this.helper.options.onResizeEnd) this.helper.options.onResizeEnd()
            this.unbindUp()
            this.unbindMove()
            this.unbindUp = this.unbindMove = undefined
        }

        this.mousedown = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setInits(e);
            this.setClamps(e);
            if(this.helper.options.onResizeStart) this.helper.options.onResizeStart();
            this.unbindMove = SinglePointerEvent.bindMove(document, this.mousemove)
            this.unbindUp = SinglePointerEvent.bindUp(document, this.mouseup)
        };

        this.handle = this.createHandleElement();
        this.unbindDown = SinglePointerEvent.bindDown(this.handle, this.mousedown);
    }

    teardown() {
        this.unbindDown()
        this.unbindUp && this.unbindUp()
        this.unbindMove && this.unbindMove()
        this.handle.parentElement.removeChild(this.handle)
    }
}

const HandleClasses = [
    class BottomRight extends HandleBase {
        /**
         * 
         * @param {SinglePointerEvent} e 
         */
        setPosition(e) {
            this.helper.options.setDimensions({
                width: this.width0 + e.clientX - this.x0,
                height: this.height0 + e.clientY - this.y0,
            });
        }
        /**
         * 
         * @param {CSSStyleDeclaration} style 
         */
        applyStyle(style) {
            style.width = `${2 * this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.right = `${- this.handleSize}px`
            style.bottom = `${- this.handleSize}px`
            style.cursor = 'nwse-resize'
        }
    },
    class Bottom extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                height: this.height0 + e.clientY - this.y0,
            });
        }
        applyStyle(style) {
            style.right = `${this.handleSize}px`
            style.left = `${this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.bottom = `${- this.handleSize}px`
            style.cursor = 'ns-resize'
        }
    },
    class BottomLeft extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                left: this.left0 + this.clampXLeft(e) - this.x0,
                width: this.width0 - (this.clampXLeft(e) - this.x0),
                height: this.height0 + e.clientY - this.y0,
            });
        }
        applyStyle(style) {
            style.left = `${- this.handleSize}px`
            style.bottom = `${- this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.cursor = 'nesw-resize'
        }
    },
    class Left extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                left: this.left0 + this.clampXLeft(e) - this.x0,
                width: this.width0 - (this.clampXLeft(e) - this.x0),
            });
        }
        applyStyle(style) {
          style.left = `${- this.handleSize}px`
          style.bottom = `${this.handleSize}px`
          style.width = `${2 * this.handleSize}px`
          style.top = `${this.handleSize}px`
          style.cursor = 'ew-resize'
        }
    },
    class TopLeft extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                left: this.left0 + this.clampXLeft(e) - this.x0,
                width: this.width0 - (this.clampXLeft(e) - this.x0),
                top: this.top0 + this.clampYTop(e) - this.y0,
                height: this.height0 - (this.clampYTop(e) - this.y0),
            });
        }
        applyStyle(style) {
            style.left = `${- this.handleSize}px`
            style.top = `${- this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.cursor = 'nwse-resize'
        }
    },
    class Top extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                top: this.top0 + this.clampYTop(e) - this.y0,
                height: this.height0 - (this.clampYTop(e) - this.y0),
            });
        }
        applyStyle(style) {
            style.left = `${this.handleSize}px`
            style.right = `${this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.top = `${- this.handleSize}px`
            style.cursor = 'ns-resize'
        }
    },
    class TopRight extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                top: this.top0 + this.clampYTop(e) - this.y0,
                height: this.height0 - (this.clampYTop(e) - this.y0),
                width: this.width0 + e.clientX - this.x0,
            });
        }
        applyStyle(style) {
            style.right = `${- this.handleSize}px`
            style.top = `${- this.handleSize}px`
            style.height = `${2 * this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.cursor = 'nesw-resize'
        }
    },
    class Right extends HandleBase {
        setPosition(e) {
            this.helper.options.setDimensions({
                width: this.width0 + e.clientX - this.x0,
            });
        }
        applyStyle(style) {
            style.right = `${- this.handleSize}px`
            style.top = `${this.handleSize}px`
            style.bottom = `${this.handleSize}px`
            style.width = `${2 * this.handleSize}px`
            style.cursor = 'ew-resize'
        }
    }
];

/**
 * @typedef Options
 * @type {object}
 * @property {number} minWidth
 * @property {number} maxWidth
 * @property {number} minHeight
 * @property {number} maxHeight
 * @property {function} onResize
 * @property {function} onResizeStart
 * @property {function} onResizeEnd
 */

 export class ResizableHelper {

     /**
      * 
      * @param {HTMLElement} container 
      * @param {Options} options 
      */
    constructor(container, options) {
        this.container = container;
        this.options   = options;
        this.handles = HandleClasses.map(H => new H(this.container, this));
    }

    teardown() {
        this.handles.forEach(h => h.teardown())
    }
}