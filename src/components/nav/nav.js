import { mergeData } from 'vue-functional-data-merge'

// -- Constants --

export const props = {
    tag: {
        type: String,
        default: 'ul'
    },
    fill: {
        type: Boolean,
        default: false
    },
    justified: {
        type: Boolean,
        default: false
    },
    align: {
        type: String,
        default: null
    },
    tabs: {
        type: Boolean,
        default: false
    },
    pills: {
        type: Boolean,
        default: false
    },
};

// -- Utils --

const computeJustifyContent = value => {
  // Normalize value
  value = value === 'left' ? 'start' : value === 'right' ? 'end' : value
  return `justify-content-${value}`
}

/**
 * Nav component.
 * Taken fom Bootstrap Vue with minor changes.
 * 
 * Codebase is very messy. Should clean up codebase.
 * 
 * @see https://bootstrap-vue.org/docs/components/nav
 * @todo clean up codebase
 */
export default {
    name: 'AimNav',
    functional: true,
    props,
    render(h, { props, data, children }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'nav',
                class: {
                    'nav-tabs': props.tabs,
                    'nav-pills': props.pills && !props.tabs,
                    'nav-fill': props.fill,
                    'nav-justified': props.justified,
                    [computeJustifyContent(props.align)]: props.align
                }
            }),
            children
        )
    }
};
