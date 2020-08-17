/**
 * True if element has flex 
 * @param {HTMLElement} el 
 */
export const hasFlex = (el) => {
    const style = el.style
    return !!style.flex ||
        !!style.flexGrow || 
        !!style.flexShrink || 
        !!style.flexBasis;
}

/**
 * Get computed dimensions from HTML element, uses HTMLElement.getBoundingClientRect() in particular.
 * @param {HTMLElement} el 
 */
export const getRect = (el) => {
    const rect = el.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const top = rect.top
    const left = rect.left
    const right = left + width
    const bottom = top + height
    return { width, height, top, left, bottom, right }
}

/**
 * Set the default (aka. natural) size of an element and get that default size
 * @param {HTMLElement} el 
 */
export function naturalSize(el) {
    const { width, height } = el.style
    el.style.width = 'auto'
    el.style.height = 'auto'
    const rect = getRect(el)
    el.style.width = width
    el.style.height = height
    return rect
}

export const setupDefaultWidth = (el) => {
    el.style.width = 'auto'
    return getRect(el).width;
}

export const setupDefaultHeight = (el) => {
    el.style.height = 'auto'
    return getRect(el).height;
}