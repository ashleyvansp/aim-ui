import { mergeData } from 'vue-functional-data-merge';
import { arrayIncludes } from '../../utils/array';
import {
    FLEX_OPTIONS,
    WRAP_OPTIONS,
    COMMON_ALIGNMENT
} from '../../utils/constants';
import { layout } from '../../mixins/layout';

/**
 * Layout column.
 * When flex is enabled then child items are placed in along the column (top to bottom) direction.
 * 
 * @example [none]
 */
export default {
    name: 'AimCol',
    functional: true,
    mixins: [layout],
    render(h, { props, data, children }) {
        const classList = [ ];
        const flexWrap = props.flexWrap === true ? 'forward' :
            (props.flexWrap === false ? 'nowrap' : props.flexWrap);
        classList.push({
            'flex': props.flex === true,
            [`flex-item-${props.flexItem}`]: props.flexItem,
            [`flex-wrap-${flexWrap}`]: flexWrap,
            [`align-items-${props.alignC}`]: props.alignC,
            [`justify-content-${props.alignM}`]: props.alignM,
            [`align-content-${props.alignContent}`]: props.alignContent
        });
        return h(
            props.tag,
            mergeData(data, { staticClass: 'col', class: classList }),
            children
        );
    }
};