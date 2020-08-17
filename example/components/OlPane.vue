<template>
    <aim-pane-container
        :flexPaneIndex="2"
        :maxWidth="400"
        @pane-resize="onPaneResize"
        @pane-resize-start="onPaneResizeStart"
        @pane-resize-end="onPaneResizeEnd"
        @pane-collapse="onPaneCollapse"
        @pane-open="onPaneOpen"
    >
        <aim-pane-menu title="Pane 1">
            <aim-col flex flexItem="fill">
                <aim-row flex>
                    <aim-col class="color-blue">TEST</aim-col>
                    <aim-col class="color-blue">TEST</aim-col>
                    <aim-col class="color-blue">TEST</aim-col>
                </aim-row>
                <aim-row flex>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                </aim-row>
                <aim-row flex>
                    <aim-col class="color-purple">TEST</aim-col>
                    <aim-col class="color-purple">TEST</aim-col>
                </aim-row>
            </aim-col>
        </aim-pane-menu>
        <aim-pane-menu title="Pane 2">
            <aim-tabs>
                <aim-tab title="Labels">
                    <MenuLabels />
                </aim-tab>
                <aim-tab title="Slides">
                    <MenuImageSlides />
                </aim-tab>
                <aim-tab title="Users">
                    <MenuUsers />
                </aim-tab>
                <aim-tab title="Comments">
                    <MenuComments />
                </aim-tab>
            </aim-tabs>
        </aim-pane-menu>
        <OlViewer />
        <aim-pane-menu title="Pane 4">
            <aim-col flex flexItem="fill">
                <aim-row flex>
                    <aim-col class="color-blue">TEST</aim-col>
                    <aim-col class="color-blue">TEST</aim-col>
                    <aim-col class="color-blue">TEST</aim-col>
                </aim-row>
                <aim-row flex>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                </aim-row>
                <aim-row flex>
                    <aim-col class="color-purple">TEST</aim-col>
                    <aim-col class="color-purple">TEST</aim-col>
                </aim-row>
            </aim-col>
        </aim-pane-menu>
        <!-- <aim-pane-menu title="Pane 5">
            <aim-col flex flexItem="fill">
                <aim-row flex>
                    <aim-col class="color-blue">TEST</aim-col>
                    <aim-col class="color-blue">TEST</aim-col>
                    <aim-col class="color-blue">TEST</aim-col>
                </aim-row>
                <aim-row flex>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                    <aim-col class="color-red">TEST</aim-col>
                </aim-row>
                <aim-row flex>
                    <aim-col class="color-purple">TEST</aim-col>
                    <aim-col class="color-purple">TEST</aim-col>
                </aim-row>
            </aim-col>
        </aim-pane-menu> -->
    </aim-pane-container>
</template>

<script>
import OlViewer from './OlViewer.vue';
import MenuLabels from './MenuLabels.vue';
import MenuImageSlides from './MenuImageSlides.vue';
import MenuUsers from './MenuUsers.vue';
import MenuComments from './MenuComments.vue';
// import MenuTestGrid from './MenuTestGrid';

export default {
    name: 'OlPane',
    components: {
        OlViewer,
        MenuLabels,
        MenuImageSlides,
        MenuUsers,
        MenuComments,
        // MenuTestGrid,
    },
    data() {
        return { };
    },
    methods: {
        onPaneResize(k) {
            console.log('onPaneResize', k);
        },
        onPaneResizeStart(k) {
            console.log('onPaneResizeStart', k);
        },
        onPaneResizeEnd(k) {
            console.log('onPaneResizeEnd', k);
        },
        onPaneCollapse(k) {
            console.log('onPaneCollapse', k);
        },
        onPaneOpen(k) {
            console.log('onPaneOpen', k);
        },
    },
};
</script>