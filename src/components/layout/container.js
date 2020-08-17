import { mergeData } from 'vue-functional-data-merge';
import { arrayIncludes } from '../../utils/array';
import { WRAPPED_BY_OPTIONS, NUM_PADDINGS } from '../../utils/constants';

/**
 * Layout container for content placed in windows and panes. Layout rows and columns may be placed in the container.
 * When flex is enabled then child items are placed in along the column (top to bottom) direction.
 * 
 * @example [none]
 */
export default {
    name: 'AimContainer',
    functional: true,
    props: {
        /**
         * Alternative HTML tag for the container to use.
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * Make this container a flex container.
         */
        flex: {
            type: [Boolean, String],
            default: false
        },
        /**
         * Set the optional padding for container contents.
         */
        pad: {
            type: [String],
            default: null,
            validator: n => parseInt(n) >=0 && parseInt(n) <= NUM_PADDINGS
        },
        /**
         * Choose styling options in CSS by specifying whether this container is. Options are one of
         * (a) 'browser' wrapper that sets the content width and height to that of the browser viewport.
         * (b) 'pane' wrapper that wraps the content within an AimPaneMenu.
         * (c) 'window' wrapper that wraps the content within an AimWindowMenu.
         * (d) 'layout' wrapper does none of the above.
         * @values browser, pane, window, layout
         */
        wrappedBy: {
            type: String,
            default: 'layout',
            validator: str => arrayIncludes(WRAPPED_BY_OPTIONS, str)
        },
    },
    render(h, { props, data, children }) {
        return h(
            props.tag,
            mergeData(data, {
                staticClass: 'container',
                class: {
                    'flex': props.flex === true || props.flex === '',
                    [`pad-${props.pad}`]: props.pad,
                    [`wrapped-by-${props.wrappedBy}`]: props.wrappedBy,
                },
            }),
            children
        );
    },
};
