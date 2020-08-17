import { mergeData } from 'vue-functional-data-merge';
import { arrayIncludes } from '../../utils/array';
import { HEADER_FOR_OPTIONS } from '../../utils/constants';

/**
 * Bar mainly used for headers for AimWindowMenu and AimPaneMenu.
 */
export default {
    name: 'AimHeaderbar',
    functional: true,
    props: {
        /**
         * Alternative HTML tag for the container to use.
         */
        tag: {
            type: String,
            default: 'div',
        },
        /**
         * Title to show on the header bar.
         */
        title: {
            type: String,
            default: null,
        },
        /**
         * Choose CSS styling options to use by specifying whether this header is:
         * (a) 'pane' header for pane menu,
         * (b) 'window' header for window menu.
         */
        headerFor: {
            type: String,
            default: null,
            validator: str => arrayIncludes(HEADER_FOR_OPTIONS, str),
        },
    },
    render(h, { props, data, slots, _v }) {
        const titleSlot = slots().title;
        const actionsSlot = slots().actions
        let titleComponent;
        if(titleSlot) {
            titleComponent = titleSlot;
        } else if(props.title) {
            titleComponent = _v(props.title);
        }
        const children = [ ];
        if(titleComponent)
            children.push(h('div', { staticClass: 'title' }, [titleComponent]));
        if(actionsSlot)
            children.push(h('div', { staticClass: 'actions' }, [actionsSlot]));
        const classList = [ ];
        classList.push({
            [`header-for-${props.headerFor}`]: props.headerFor,
        });
        return h(
            props.tag,
            mergeData(data, { staticClass: 'headerbar', class: classList }),
            children
        );

    },
};
