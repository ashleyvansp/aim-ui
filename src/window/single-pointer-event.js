import { hasWindowSupport } from "../utils/env";

export const isTouchEvent = (e) => {
    return window.TouchEvent && e instanceof TouchEvent;
};

export class V2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new V2(this.x, this.y);
    }
}

export class SinglePointerEvent {
    constructor(e) {
        this.e = e;
    }
    
    stopPropagation() {
        this.e.stopPropagation()
    }
    
      preventDefault() {
        this.e.preventDefault()
    }

    get clientX() {
        if (isTouchEvent(this.e)) {
            let touched = this.e.type === 'touchend' ? this.e.changedTouches : this.e.touches;
            return touched.item(0).clientX;
        } else {
            return this.e.clientX;
        }
    }
    
    get clientY() {
        if (isTouchEvent(this.e)) {
            let touched = this.e.type === 'touchend' ? this.e.changedTouches : this.e.touches;
            return touched.item(0).clientY;
        } else {
            return this.e.clientY;
        }
    }

    get clientCoord() {
        return new V2(this.clientX, this.clientY);
    }

    /**
     * 
     * @param {HTMLElement} target
     * @param {function} cb
     * @param {function} cancel
     */
    static bindDown(target, cb, cancel, useCapture = false) {
        const mouse = (e) => {
            cb(new SinglePointerEvent(e));
        };
        const touch = (e) => {
            if(e.touches.length ===1) {
                cb(new SinglePointerEvent(e));
            }
            if (e.touches.length > 1) {
                cancel && cancel(new SinglePointerEvent(e))
            }
        }
        target.addEventListener('mousedown', mouse, useCapture);
        target.addEventListener('touchstart', touch, useCapture);
        return () => {
            target.removeEventListener('mousedown', mouse, useCapture);
            target.removeEventListener('touchstart', touch, useCapture);
        };
    }

    static bindMove(target, cb, useCapture = false) {
        const mouse = (e) => {
            cb(new SinglePointerEvent(e));
        };
        const touch = (e) => {
            if(e.touches.length === 1) {
                cb(new SinglePointerEvent(e));
            }
        }
        target.addEventListener('mousemove', mouse, useCapture);
        target.addEventListener('touchmove', touch, useCapture);
        return () => {
            target.removeEventListener('mousemove', mouse, useCapture);
            target.removeEventListener('touchmove', touch, useCapture);
        };
    }

    static bindUp(target, cb, useCapture = false) {
        const mouse = (e) => {
            cb(new SinglePointerEvent(e));
        };
        const touch = (e) => {
            if(e.touches.length === 0) {
                cb(new SinglePointerEvent(e));
            }
        };
        target.addEventListener('mouseup', mouse, useCapture);
        target.addEventListener('touchend', touch, useCapture);
        return () => {
            target.removeEventListener('mouseup', mouse, useCapture);
            target.removeEventListener('touchend', touch, useCapture);
        };
    }

    originalEvent({ mouse, touch }) {
        if(isTouchEvent(this.e)) {
            touch && touch(this.e);
        } else {
            mouse && mouse(this.e);
        }
    }
}