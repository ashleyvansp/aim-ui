import { arrayIncludes } from '../utils/array';
import { isBoolean } from '../utils/inspect'
import {
    FLEX_OPTIONS,
    WRAP_OPTIONS,
    COMMON_ALIGNMENT
} from '../utils/constants';

export const layout = {
    props: {
        /**
         * Alternative HTML tag for the container to use.
         */
        tag: {
            type: String,
            default: 'div'
        },
        /**
         * True if layout item's children should be displayed using flex, normal flow otherwise.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/display
         */
        flex: {
            type: Boolean,
            default: false
        },
        /**
         * Make layout item fill it's container along its main axis.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
         */
        flexItem: {
            type: String,
            default: null,
            validator: str => arrayIncludes(FLEX_OPTIONS, str)
        },
        /**
         * Set the wrapping and layout of layout item's children.
         * If `true` is passed then use 'forward' option, and if `false` is passed then use 'nowrap' option.
         * @values true, 'nowrap', 'forward', 'backward'
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
         */
        flexWrap: {
            type: [Boolean, String],
            default: 'nowrap',
            validator: o => isBoolean(o) || arrayIncludes(WRAP_OPTIONS, o)
        },
        /**
         * How to align items along the cross axis if using flex display.
         * Is based on `align-items` CSS property.
         * @values 'start', 'end', 'center', 'baseline', 'stretch'
         * @see https://css-tricks.com/almanac/properties/a/align-items/
         */
        alignC: {
            type: String,
            default: null,
            validator: str => arrayIncludes(COMMON_ALIGNMENT.concat(['baseline', 'stretch']), str)
          },
        /**
         * How to align items along the main axis if using flex display.
         * Is based on `justify-content` CSS property.
         * @values 'start', 'end', 'center', 'between', 'around'
         * @see https://css-tricks.com/almanac/properties/a/align-items/
         */
        alignM: {
            type: String,
            default: null,
            validator: str => arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around']), str)
        },
        /**
         * How to align items along the main axis if using flex display.
         * Is based on `align-content` CSS property.
         * @values 'start', 'end', 'center', 'between', 'around', 'stretch'
         * @see https://css-tricks.com/almanac/properties/a/align-content/
         */
        alignContent: {
            type: String,
            default: null,
            validator: str => arrayIncludes(COMMON_ALIGNMENT.concat(['between', 'around', 'stretch']), str)
        },
    },
};