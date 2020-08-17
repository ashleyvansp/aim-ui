import { isNumber } from './inspect';

export const distance2 = (x1, y1, x2, y2) => {
    const dx = x1 - x2
    const dy = y1 - y2
    return dx * dx + dy * dy
}

export const clamp = (v, { upper, lower }) => {
    if(isNumber(upper)) v = Math.min(v, upper);
    if(isNumber(lower)) v = Math.max(v, lower);
    return v;
}