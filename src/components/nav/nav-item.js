import { mergeData } from 'vue-functional-data-merge'
import AimLink, { propsFactory as linkPropsFactory } from '../link/link'

export const props = linkPropsFactory()

/**
 * @example [none]
 */
export default {
  name: 'AimNavItem',
  functional: true,
  props: {
    ...props,
    linkAttrs: {
      type: Object,
      default: () => {}
    },
    linkClasses: {
      type: [String, Object, Array],
      default: null
    }
  },
  render(h, { props, data, listeners, children }) {
    // We transfer the listeners to the link
    delete data.on
    return h(
      'li',
      mergeData(data, {
        staticClass: 'nav-item'
      }),
      [
        h(
            AimLink,
          {
            staticClass: 'nav-link',
            class: props.linkClasses,
            attrs: props.linkAttrs,
            props,
            on: listeners
          },
          children
        )
      ]
    )
  }
};
