import { mergeData } from 'vue-functional-data-merge';
import { WRAP_OPTIONS } from '../../utils/constants';

/**
 * Toolbar that contains many buttons and possibly a logo.
 */
export default {
    name: 'AimToolbar',
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
         * Flex wrap property of toolbar row.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
         */
        flexWrap: {
            type: String,
            default: null,
            validator: str => arrayIncludes(WRAP_OPTIONS, str)
        },
    },
    render(h, { props, data, slots }) {
        const children = [ ];
        const defaultSlots = slots().default;
        const numberOfSlots = defaultSlots.length;
        const logo = slots().logo;
        if(logo) {
            children.push(h('div', { staticClass: 'logo' }, [logo]));
            if(numberOfSlots > 0)
                children.push(h('div', { staticClass: 'divider' }));
        }
        for(let i = 0; i < numberOfSlots; i++) {
            const slot = defaultSlots[i];
            slot.key = i;
            children.push(h('div', { staticClass: 'item' }, [slot]));
            if(i < numberOfSlots - 1) {
                children.push(h('div', { staticClass: 'divider' }));
            }
        }
        const classList = [ ];
        classList.push({
            [`flex-wrap-${props.flexWrap}`]: props.flexWrap,
        });

        return h(
            props.tag,
            mergeData(data, { staticClass: 'toolbar', class: classList }),
            children
        );
    },
};