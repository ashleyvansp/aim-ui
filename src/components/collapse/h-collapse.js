import { mergeData } from 'vue-functional-data-merge';
import { getBCR, reflow, requestAF } from '../../utils/dom';

// Transition event handler helpers
const onEnter = el => {
    el.style.width = 0
    // Animaton frame delay neeeded for `appear` to work
    requestAF(() => {
        reflow(el)
        el.style.width = `${el.scrollWidth}px`;
    })
};
  
const onAfterEnter = el => {
    el.style.width = null;
}
  
const onLeave = el => {
    el.style.width = 'auto'
    el.style.display = 'block'
    el.style.width = `${getBCR(el).width}px`
    reflow(el)
    el.style.width = 0
}
  
const onAfterLeave = el => {
    el.style.width = null
}
  
// Default transition props
// `appear` will use the enter classes
const TRANSITION_PROPS = {
    css: true,
    enterClass: '',
    enterActiveClass: 'collapsing-horizontal',
    enterToClass: 'collapse show',
    leaveClass: 'collapse show',
    leaveActiveClass: 'collapsing-horizontal',
    leaveToClass: 'collapse'
}
  
// Default transition handlers
// `appear` will use the enter handlers
const TRANSITION_HANDLERS = {
    enter: onEnter,
    afterEnter: onAfterEnter,
    leave: onLeave,
    afterLeave: onAfterLeave
}

/**
 * Provides toggleable visibility of of page content within a horizontally collapsing container.
 * @example [none]
 */
export default {
    name: 'AimHCollapse',
    functional: true,
    props: {
        /**
         * Whether to make component content initially visible.
         */
        appear: {
            type: Boolean,
            default: false
        }
    },
    render(h, { props, data, children }) {
        return h(
            'transition',
            // We merge in the `appear` prop last
            mergeData(data, { props: TRANSITION_PROPS, on: TRANSITION_HANDLERS }, { props }),
            // Note: `<tranition>` supports a single root element only
            children
        );
    }
};