import { isArray, isNull, isPlainObject, isString, isUndefined } from './inspect';
import { keys } from './object'
import { toString } from './string'

const ANCHOR_TAG = 'a'

export const computeTag = ({ to, disabled } = {}, thisOrParent) => {
    return (thisOrParent.$router && to && !disabled) ? 'router-link' : ANCHOR_TAG;
}

export const isRouterLink = tag => toString(tag).toLowerCase() !== ANCHOR_TAG;

export const computeRel = ({ target, rel } = {}) => {
    if (target === '_blank' && isNull(rel)) {
      return 'noopener'
    }
    return rel || null
}

export const computeHref = (
    { href, to } = {},
    tag = ANCHOR_TAG,
    fallback = '#',
    toFallback = '/'
) => {
    // We've already checked the $router in computeTag(), so isRouterLink() indicates a live router.
    // When deferring to Vue Router's router-link, don't use the href attribute at all.
    // We return null, and then remove href from the attributes passed to router-link
    if (isRouterLink(tag)) {
      return null
    }
  
    // Return `href` when explicitly provided
    if (href) {
      return href
    }
  
    // Reconstruct `href` when `to` used, but no router
    if (to) {
      // Fallback to `to` prop (if `to` is a string)
      if (isString(to)) {
        return to || toFallback
      }
      // Fallback to `to.path + to.query + to.hash` prop (if `to` is an object)
      if (isPlainObject(to) && (to.path || to.query || to.hash)) {
        const path = toString(to.path)
        const query = stringifyQueryObj(to.query)
        let hash = toString(to.hash)
        hash = !hash || hash.charAt(0) === '#' ? hash : `#${hash}`
        return `${path}${query}${hash}` || toFallback
      }
    }
  
    // If nothing is provided return the fallback
    return fallback
  }