This component automatically fills items passed to it in a [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/). The `items` prop is a multiarray where each item to display in a cell can be retrieved by specifying the row and column like so `items[row][column]`. Rendering each of these cells is done using [scoped slots](https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots) using these rules:

1. Scoped slots that use the naming syntax `col(${column})` are used to render each cell under the column `column`.
2. Scoped slots named `col()` render the cells under the rest of the columns where (1.) does not apply to.
3. Scoped slots named `col-span` render cells that have `span: true`.

```
<template>
    <aim-container class="example" flex :style="{height: '300px', width: '100%'}">
        <aim-grid
            :columns="[100, 'auto', 150]"
            :rows="[35]"
            :items="items"
            columnGap="0.5rem"
            rowGap="1rem"
        >
            <template v-slot:col(0)="props">
                <div class="blue">{{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}</div>
            </template>
            <template v-slot:col(1)="props">
                <div class="red">{{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}</div>
            </template>
            <template v-slot:col()="props">
                <div class="purple">{{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}</div>
            </template>
            <template v-slot:col-span="props">
                <div class="green">{{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}</div>
            </template>
        </aim-grid>
    </aim-container>
</template>

<script>
const mockItems = [
    [
        { text: 'Triangle' },
        { text: 'Square' },
        { text: 'Pentagon' },
    ],
    [
        {
            span: true,
            text: 'I span',
        },
    ],
    [
        { text: 'Rectangle' },
        { text: 'Hexagon' },
        { text: 'Quadrilateral' },
    ],
    [
        { text: 'Circle' },
        { text: 'Ellipse' },
        { text: 'Equilateral' },
    ],
    [
        {
            span: true,
            text: 'I also span',
        },
    ],
    [
        { text: 'Convex Blob' },
        { text: 'Concave Blob' },
        { text: 'Astroid' },
    ],
];

export default {
    data() {
        return {
            items: mockItems,
        };
    },
};
</script>
```

Here's a different example with four columns.

```
<template>
    <aim-container class="example" flex :style="{height: '300px', width: '100%'}">
        <aim-grid
            :columns="[100, 150, 100, 150]"
            :rows="[45]"
            :items="items"
            columnGap="0.5rem"
            rowGap="1rem"
        >
            <template v-slot:col(0)="props">
                <div class="blue">{{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}</div>
            </template>
            <template v-slot:col(3)="props">
                <div class="red">{{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}</div>
            </template>
            <template v-slot:col()="props">
                <div class="demo" :style="{ background: props.color }">
                    {{ props.text }} at row {{ props.rowIndex }} and column {{ props.colIndex }}
                </div>
            </template>
        </aim-grid>
    </aim-container>
</template>

<script>
const mockItems = [
    [
        { text: 'Triangle' },
        { text: 'Square', color: 'lightgoldenrodyellow' },
        { text: 'Pentagon', color: 'lightskyblue' },
        { text: 'Rectangle' },
    ],
    [
        { text: 'Hexagon' },
        { text: 'Quadrilateral', color: 'lightgreen' },
        { text: 'Circle', color: 'lightsteelblue' },
        { text: 'Ellipse' },
    ],
    [
        { text: 'Equilateral' },
        { text: 'Convex Blob', color: 'lightseagreen' },
        { text: 'Concave Blob', color: 'lightyellow' },
        { text: 'Astroid' },
    ],
    [
        { text: 'Nonagon' },
        { text: 'Parallelogram', color: 'violet' },
        { text: 'Rhomboid', color: 'burlywood' },
        { text: 'Trapezoid' },
    ],
];

export default {
    data() {
        return { items: mockItems };
    },
};
</script>
```

### Vertical and Horizontal Grids

Not fully implemented yet.
