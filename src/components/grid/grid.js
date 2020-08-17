import normalizeSlotMixin from '../../mixins/normalize-slot';
import { isUndefinedOrNull, isNumber, isString, isArray } from '../../utils/inspect';
import { toString } from '../../utils/string';
import { NUM_PADDINGS } from '../../utils/constants';

/**
 * Provides a CSS Grid.
 * 
 * Loosely based off Bootstrap Vue tables.
 * 
 * @see https://bootstrap-vue.org/docs/components/table
 * @todo make it possible to toggle AimGrid to act like a vertical table or a horizontal table using vertical and horizontal props. Use grid-auto-rows when vertical. Use grid-auto-columns when horizontal.
 */
export default {
    name: 'AimGrid',
    mixins: [normalizeSlotMixin],
    props: {
        // vertical: {
        //     typle: Boolean,
        //     default: false,
        // },
        // horizontal: {
        //     type: Boolean,
        //     default: false,
        // },
        /**
         * Set the optional padding for grid contents.
         */
        pad: {
            type: [String],
            default: null,
            validator: n => parseInt(n) >=0 && parseInt(n) <= NUM_PADDINGS
        },
        /**
         * Array of track sizes for grid-template-columns.
         * Is an array of either integer for pixel size, or the word 'auto'.
         * The length of the array indicates the number of columns the grid has.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns
         */
        columns: {
            type: Array,
            default() {
                return ['auto'];
            },
        },
        /**
         * Array of track sizes for grid-template-rows.
         * Is an array of either integer for pixel size, or the word 'auto'.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows
         */
        rows: {
            type: Array,
            default() {
                return ['auto'];
            },
        },
        /**
         * Column gap size. Same value as that of the CSS property `column-gap`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap
         */
        columnGap: {
            type: String,
            default: null,
        },
        /**
         * Row gap size. Same value as that of the CSS property `row-gap`.
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap
         */
        rowGap: {
            type: String,
            default: null,
        },
        /**
         * Array of array of items to fill the grid.
         * The index of the outer array refers to the row of the grid.
         * The index of inner arrays refers to the column of the grid.
         */
        items: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            localItems: isArray(this.items) ? this.items.slice() : [],
        };
    },
    computed: {
        computedStyle() {
            const columns = ['[col-start]', ...this.columns, '[col-end]'];
            const gridTemplateColumns = columns
                    .map(item => {
                        return isNumber(item) ? `${item}px` : item;
                    }).join(' ');
            const gridAutoRows = this.rows
                    .map(item => {
                        return isNumber(item) ? `${item}px` : item;
                    }).join(' ');
            return {
                gridTemplateColumns,
                gridAutoRows,
                columnGap: this.columnGap,
                rowGap: this.rowGap,
            };
        },
        colSpanSlotName() {
            return 'col-span';
        },
    },
    watch: {
        items(newItems) {
            this.localItems = isArray(newItems) ? newItems.slice() : [];
        },
    },
    methods: {
        getColSlotName(colIndex=null) {
            return isUndefinedOrNull(colIndex) ? 'col()' : `col(${colIndex})`;
        },
        getItem(rowIndex, colIndex) {
            if(this.localItems.length <= rowIndex) {
                return null;
            } else if(this.localItems[rowIndex].length <= colIndex) {
                return null;
            } else {
                return this.localItems[rowIndex][colIndex];
            }
        },
        createColSpanItem(h, item, rowIndex) {
            const slotScope = {
                item,
                ...item,
                rowIndex,
            };
            const slotName = this.$slotNameCache[this.colSpanSlotName];
            const children = !isUndefinedOrNull(slotName)
                    ? this.normalizeSlot(slotName, slotScope)
                    : !isUndefinedOrNull(item) ? [toString(item)] : [h()];
            return h(
                'div',
                {
                    key: `row-${rowIndex}-col-span`,
                    staticClass: 'grid-item',
                    class: [this.colSpanSlotName],
                },
                children
            );
        },
        createItem(h, rowIndex, colIndex) {
            const item = this.getItem(rowIndex, colIndex);
            const slotScope = {
                item,
                ...item,
                rowIndex,
                colIndex,
            };
            const slotName = this.$slotNameCache[colIndex];
            const children = !isUndefinedOrNull(slotName)
                    ? this.normalizeSlot(slotName, slotScope)
                        : !isUndefinedOrNull(item) ? [toString(item)] : [h()];
            return h(
                'div',
                {
                    key: `row-${rowIndex}-col-${colIndex}`,
                    staticClass: 'grid-item',
                },
                [children]
            );
        },
        createRow(h, row, rowIndex) {
            if(row.length > 0 && !isUndefinedOrNull(row[0]) && row[0].span) {
                return [this.createColSpanItem(h, row[0], rowIndex)];
            }
            const children = [];
            for(let colIndex = 0; colIndex < this.columns.length; colIndex++) {
                children.push(this.createItem(h, rowIndex, colIndex));
            }
            return children;
        },
    },
    render(h) {
        const slotNameCache = {};
        const defaultSlotName = this.hasNormalizedSlot(this.getColSlotName())
                ? this.getColSlotName() : null;
        for(let i = 0; i < this.columns.length; i++) {
            const slotName = this.getColSlotName(i);
            slotNameCache[i] = this.hasNormalizedSlot(slotName)
                    ? slotName : defaultSlotName;
        }
        slotNameCache[this.colSpanSlotName] = this.hasNormalizedSlot(this.colSpanSlotName)
                ? this.colSpanSlotName : defaultSlotName;
        this.$slotNameCache = slotNameCache;
        const children = [];
        this.localItems.forEach((row, rowIndex) => {
            children.push(...this.createRow(h, row, rowIndex));
        });
        return h(
            'div',
            {
                staticClass: 'grid',
                class: {
                    [`pad-${this.pad}`]: this.pad,
                },
                style: this.computedStyle,
            },
            children);
    },
};