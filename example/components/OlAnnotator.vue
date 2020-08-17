<template>
    <aim-container flex wrappedBy="browser">
        <OlToolbar />
        <aim-row flex flexItem="fill">
            <OlPane />
        </aim-row>
        <OlWindowList />
    </aim-container>
</template>

<script>
import OlToolbar from './OlToolbar.vue';
import OlPane from './OlPane.vue';
import OlWindowList from './OlWindowList.vue';

export default {
    name: 'OlAnnotator',
    components: {
        OlToolbar,
        OlPane,
        OlWindowList,
    },
    data() {
        return { };
    },
};
</script>

<style>
#ome-viewer {
    width: 100%;
    height: 100%;
}

.color-blue {
    background: lightblue;
    border: 1px solid blue;
}

.color-red {
    background: lightcoral;
    border: 1px solid red;
}

.color-purple {
    background: plum;
    border: 1px solid purple;
}
</style>