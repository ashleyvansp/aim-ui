import { mergeData } from 'vue-functional-data-merge';

/**
 * Section
 */
export default {
    name: 'AimSection',
    functional: true,
    props: {
        /**
         * Alternative HTML tag for the container to use.
         */
        tag: {
            type: String,
            default: 'div'
        },
    },
    render(h, { props, data, children }) {
        return h(
            props.tag,
            mergeData(data, { staticClass: 'section' }),
            children
        );
    }
};
