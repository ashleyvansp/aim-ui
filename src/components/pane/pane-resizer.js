import { mergeData } from 'vue-functional-data-merge';

/**
 * @example [none]
 */
export default {
    name: 'AimPaneResizer',
    functional: true,
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        hide: {
            type: Boolean,
            default: false,
        },
    },
    render(h, { props, data }) {
        const classList = [ ];
        classList.push({
            'hide': props.hide,
        });
        return h(
            props.tag,
            mergeData(data, { staticClass: 'pane-resizer', class: classList })
        );
    },
};
