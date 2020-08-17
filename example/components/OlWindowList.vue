<template>
    <div>
        <aim-window-menu
            title="TEST 1"
            resizable
            scrollable
            :minWidth="300"
            :minHeight="400"
            :maxWidth="800"
            :maxHeight="800"
            :isOpen="getWindowIsOpen(1)"
            @update:isOpen="mode => setWindowOpen({ index: 1, mode })"
        >
            <aim-tabs>
                <aim-tab title="Blank">
                    
                </aim-tab>
                <aim-tab title="Grid">
                    <MenuTestGrid />
                </aim-tab>
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
        </aim-window-menu>
        <aim-window-menu
            title="TEST 2"
            :initWidth="200"
            :initHeight="200"
            :isOpen="getWindowIsOpen(2)"
            @update:isOpen="mode => setWindowOpen({ index: 2, mode })"
        >
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
        </aim-window-menu>
        <aim-window-menu
            title="TEST 2"
            :initWidth="200"
            :initHeight="200"
            :isOpen="getWindowIsOpen(3)"
            @update:isOpen="mode => setWindowOpen({ index: 3, mode })"
        >
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
        </aim-window-menu>
        <aim-window-menu
            title="TEST 2"
            :initWidth="200"
            :initHeight="200"
            :isOpen="getWindowIsOpen(4)"
            @update:isOpen="mode => setWindowOpen({ index: 4, mode })"
        >
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
        </aim-window-menu>
        <aim-window-menu
            title="TEST 2"
            :initWidth="200"
            :initHeight="200"
            :isOpen="getWindowIsOpen(5)"
            positionHint="center"
            @update:isOpen="mode => setWindowOpen({ index: 5, mode })"
        >
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
        </aim-window-menu>
        <aim-window-menu
            title="TEST 3"
            resizable
            scrollable
            :minWidth="300"
            :minHeight="400"
            :maxWidth="800"
            :maxHeight="800"
            :isOpen="getWindowIsOpen(0)"
            positionHint="center"
            @update:isOpen="mode => setWindowOpen({ index: 0, mode })"
        >
            <aim-tabs>
                <aim-tab title="Blank">
                </aim-tab>
                <aim-tab title="Color Palette">
                    <MenuColorPalette />
                </aim-tab>
            </aim-tabs>
        </aim-window-menu>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MenuLabels from './MenuLabels.vue';
import MenuImageSlides from './MenuImageSlides.vue';
import MenuComments from './MenuComments.vue';
import MenuUsers from './MenuUsers.vue';
import MenuTestGrid from './MenuTestGrid';
import MenuColorPalette from './MenuColorPalette.vue';

export default {
    name: 'OlWindowList',
    components: {
        MenuLabels,
        MenuImageSlides,
        MenuComments,
        MenuUsers,
        MenuTestGrid,
        MenuColorPalette,
    },
    data() {
        return { };
    },
    computed: {
        ...mapGetters([
            'getWindowIsOpen'
        ]),
    },
    methods: {
        ...mapActions([
            'setWindowOpen',
        ]),
    },
};
</script>