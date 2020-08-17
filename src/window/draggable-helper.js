import { SinglePointerEvent } from './single-pointer-event';

/**
 * @typedef Options
 * @type {object}
 * @property {function} onMove
 * @property {function} onMoveStart
 * @property {function} onMoveEnd
 */

const print = console.log;

export class DraggableHelper {
    /**
     * 
     * @param {HTMLElement} handle 
     * @param {HTMLElement} container 
     * @param {Options} options 
     */
    constructor(handle, container, options = {}) {
        this.handle = handle;
        this.container = container;
        this.options   = options;

        this.mousemove = (e) => {
            this.options.setDimensions({
                left: e.clientX - this.offsetX,
                top: e.clientY - this.offsetY,
            });
            if(this.options.onMove) this.options.onMove();
        };

        this.mouseup = (e) => {
            if(this.options.onMoveEnd) this.options.onMoveEnd();
            this.unbindUp()
            this.unbindMove()
            this.unbindUp = this.unbindMove = undefined
        };

        this.mousedown = (e) => {
            e.preventDefault();
            const { left, top } = this.options.getDimensions();
            this.offsetX = e.clientX - left;
            this.offsetY = e.clientY - top;
            if(this.options.onMoveStart) this.options.onMoveStart();
            this.unbindMove = SinglePointerEvent.bindMove(document, this.mousemove);
            this.unbindUp = SinglePointerEvent.bindUp(document, this.mouseup);
        };

        this.unbindDown = SinglePointerEvent.bindDown(this.handle, this.mousedown)
        this.handle.classList.add('draggable-handle');
    }

    teardown() {
        this.handle.classList.remove('draggable-handle');
        this.unbindDown();
        if(this.unbindUp) this.unbindUp();
        if(this.unbindMove) this.unbindMove();
    }
}