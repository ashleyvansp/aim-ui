<template>
    <aim-container pad="2">
        <aim-section>
            <aim-section-item>
                <aim-grid pad="2"
                    :columns="columns"
                    :rowGap="rowGap"
                    :items="items"
                >
                    <template v-slot:row()="props">
                        <div :style="applyOuterStyle(props)">
                            <div :style="applyInnerStyle(props)">
                                {{ props.name }}
                                {{ props.description }}
                            </div>
                        </div>
                    </template>
                </aim-grid>
            </aim-section-item>
        </aim-section>
    </aim-container>
</template>

<script>
import { hexToStringRGBA } from '../utils/color';
const mockItems = [];
const overlayOpacities = [
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.00, name: 'surface 00dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.05, name: 'surface 01dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.07, name: 'surface 02dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.08, name: 'surface 03dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.09, name: 'surface 04dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.11, name: 'surface 06dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.12, name: 'surface 08dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.14, name: 'surface 12dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.15, name: 'surface 16dp' },
    { base: '#121212', color: '#FFFFFF', fontColor: 'white', opacity: 0.24, name: 'surface 24dp' },
    { base: '#121212', color: '#0041C1', fontColor: 'white', opacity: 0.16, name: 'dark blue' },
    { base: '#121212', color: '#4416FF', fontColor: 'white', opacity: 0.16, name: 'dark violet' },
    { base: '#121212', color: '#00FFF5', fontColor: 'white', opacity: 0.16, name: 'dark turquoise' },
    { base: '#121212', color: '#FFA700', fontColor: 'white', opacity: 0.16, name: 'dark yellow' },
    { base: '#0041C1', color: '#FFFFFF', fontColor: 'black', opacity: 0, name: 'blue' },
    { base: '#4416FF', color: '#FFFFFF', fontColor: 'black', opacity: 0, name: 'violet' },
    { base: '#00FFF5', color: '#FFFFFF', fontColor: 'black', opacity: 0, name: 'turquoise' },
    { base: '#FFA700', color: '#FFFFFF', fontColor: 'black', opacity: 0, name: 'yellow' },
];
overlayOpacities.forEach((bulk) => {
    mockItems.push([{
        ...bulk,
        description: `base ${bulk.base} + overlay ${bulk.color} at ${Math.trunc(100 * bulk.opacity)}%`,
    }]);
});

export default {
    name: 'MenuColorPalette',
    data() {
        return {
            columns: ['minmax(0, 1fr)'],
            rowGap: '0.5rem',
            items: mockItems,
        };
    },
    methods: {
        applyOuterStyle(props) {
            return {
                border: '1px solid black',
                minHeight: '2rem',
                backgroundColor: props.base,
            };
        },
        applyInnerStyle(props) {
            const backgroundColor = hexToStringRGBA(props.color, props.opacity);
            return {
                width: '100%',
                height: '100%',
                minHeight: '2rem',
                color: props.fontColor,
                backgroundColor,
            };
        },
    },
};
</script>