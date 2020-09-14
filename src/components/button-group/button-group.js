import { mergeData } from 'vue-functional-data-merge';

/**
 * Button group is a horizontal series of buttons.
 */
export default {
    name: 'AimButtonGroup',
    functional: true,
    props: {
        /**
         * Alternative HTML tag to use.
         */
        tag: {
            type: String,
            default: 'div',
        },
        /**
         * WAI-ARIA role.
         */
        ariaRole: {
            type: String,
            default: 'group'
        },
        /**
         * Whether this group is a subgroup within another button group.
         */
        subgroup: {
            type: Boolean,
            default: false,
        },
        /**
         * Whether this group is in a toolbar
         */
        toolbar: {
            type: Boolean,
            default: false
        }
    },
    render(h, { props, data, children }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'btn-group',
                class: {
                    'btn-subgroup': props.subgroup,
                    'btn-toolbar': props.toolbar,
                },
                attrs: { role: props.ariaRole }
            }),
            children
        );
    },
};
