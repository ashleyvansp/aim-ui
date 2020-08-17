import { isNumber } from './inspect';

/**
 * 
 * @param {string} hex 
 * @param {number} alpha 
 */
export const hexToStringRGBA = (hex, alpha) => {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (isNumber(alpha)) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

/**
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns {string}
 */
export const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')

/**
 * Convert HSV colors to RGB
 * @param {number} h hue number 0..1
 * @param {number} s saturation number 0..1
 * @param {number} v value number 0..1
 * @returns {Array} array of red, green and blue
 */
export const hsvToRGB = (h, s, v) => {
    const h_i = parseInt(h * 6);
    const f = (h * 6) - h_i;
    const p = v * (1 - s);
    const q = v * (1 - (f * s));
    const t = v * (1 - (1 - f) * s);
    let r, g, b;
    if(h_i === 0) {
        [r, g, b] = [v, t, p];
    } else if(h_i === 1) {
        [r, g, b] = [q, v, p];
    } else if(h_i === 2) {
        [r, g, b] = [p, v, t];
    } else if(h_i === 3) {
        [r, g, b] = [p, q, v];
    } else if(h_i === 4) {
        [r, g, b] = [t, p, v];
    } else if(h_i === 5) {
        [r, g, b] = [v, p, q];
    }
    return [
        parseInt(r * 256),
        parseInt(g * 256),
        parseInt(b * 256),
    ];
}

export const hsvToHex = (h, s, v) => rgbToHex(...hsvToRGB(h, s, v));

const random = () => {
    const golden_ratio_conjugate = 0.618033988749895;
    return (Math.random() + golden_ratio_conjugate) % 1;
};

/**
 * Convert HSV colors to RGB
 * @param {number|Array} s saturation number 0..1
 * @param {number|Array} v value number 0..1
 * @returns {Array} array of red, green and blue
 */
export const randHex = (s, v) => {
    if(Array.isArray(s)) {
        v = random() * (s[1] - s[0]) + s[0];
    }
    if(Array.isArray(v)) {
        v = random() * (v[1] - v[0]) + v[0];
    }
    return hsvToHex(random(), s, v);
};

/**
 * https://css-tricks.com/snippets/javascript/lighten-darken-color/
 * @param {string} hex 
 * @param {number} amt 
 */
export const hexAdjustContrast = (hex, amt) => {
    hex = hex.slice(1);
    const num = parseInt(hex,16);
    let r = (num >> 16) + amt;
    if (r > 255) r = 255;
    else if  (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) + amt;
    if (b > 255) b = 255;
    else if  (b < 0) b = 0;
    let g = (num & 0x0000FF) + amt;
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return "#" + (g | (b << 8) | (r << 16)).toString(16); 
}