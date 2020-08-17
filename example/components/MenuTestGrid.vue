<template>
    <aim-container pad="2">
        <div class="section">
            <div class="section-item">
                <aim-grid
                    :columns="columns"
                    :items="items"
                    columnGap="0.5rem"
                    rowGap="1rem"
                >
                    <template v-slot:col(0)="props">
                        {{ props.text }}
                    </template>
                    <template v-slot:col(1)="props">
                        {{ props.text }}
                    </template>
                    <template v-slot:col()="props">
                        {{ props.text }}
                    </template>
                    <template v-slot:col-span="props">
                        {{ props.text }}
                    </template>
                </aim-grid>
            </div>
        </div>
    </aim-container>
</template>

<script>
const mockColumns = [30, 30, 'auto'];
const mockItems = [
    [
        { text: 'item 1' },
        { text: 'item 2' },
        { text: 'item 3' },
    ],
    [
        {
            span: true,
            text: 'I span this row',
        },
    ],
    [
        { text: 'item 4' },
        { text: 'item 5' },
        { text: 'item 6' },
    ],
];

export default {
    name: 'MenuTestGrid',
    data() {
        return {
            columns: mockColumns,
            items: mockItems,
        };
    },
};
</script>