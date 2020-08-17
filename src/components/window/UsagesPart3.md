A more complex example of a resizable window without close button, containing some text.

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window</aim-button>
        <aim-window-menu
            title="Resizable Window"
            :initWidth="200"
            :initHeight="200"
            resizable
            hideCloseButton
            v-model="isOpen"
        >
            <aim-tabs>
                <aim-tab title="Tab 1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tempor accumsan justo, in porttitor turpis ultrices ut. Sed venenatis ante ex, non consequat purus sollicitudin sit amet. Pellentesque sagittis ligula laoreet, dapibus turpis eget, accumsan elit. Mauris semper sit amet tellus et bibendum. Maecenas laoreet lacinia augue, nec pharetra ligula vestibulum vitae. Suspendisse pharetra dignissim arcu non aliquet. Quisque aliquam quam mauris. Suspendisse condimentum purus ut orci pharetra, posuere egestas arcu cursus. Mauris euismod suscipit metus in congue. Aliquam dignissim ex eu aliquam pretium. Quisque convallis hendrerit scelerisque. Quisque nec elit sem. Pellentesque auctor rhoncus diam et molestie. Duis imperdiet rhoncus sagittis. Nullam convallis lacus ac elit blandit interdum.
                </aim-tab>
                <aim-tab title="Tab 2">
                    Sed vitae ex lectus. Nam sem est, consequat at scelerisque vel, venenatis pulvinar elit. Integer euismod urna velit, sed finibus dui tincidunt a. Sed tincidunt feugiat ex, quis bibendum lectus aliquam vitae. Integer consequat tellus ac interdum dignissim. Suspendisse ullamcorper, dui vitae sagittis dapibus, ligula tortor molestie lacus, sit amet semper lacus justo vel quam. Nulla vulputate augue sed nisl fermentum placerat. Donec viverra sit amet diam in tristique. Suspendisse pharetra eros id nulla euismod finibus. Suspendisse venenatis elit lectus, in commodo tellus dapibus vel. Suspendisse malesuada tellus ac lacus commodo, quis elementum justo rutrum.
                </aim-tab>
                <aim-tab title="Tab 3">
                    Maecenas vulputate ex ut tellus pharetra, nec tempus massa fringilla. Curabitur eget consequat augue. Quisque tincidunt et neque in euismod. Integer aliquet sed lorem vitae ultrices. Nam mollis lectus ut magna pulvinar consectetur. Praesent vehicula risus et leo volutpat semper. Duis finibus finibus urna, sed pretium risus ullamcorper ut. Fusce consectetur augue risus, sed pellentesque tellus rutrum in. Nam iaculis lobortis lorem non molestie.
                </aim-tab>
            </aim-tabs>
        </aim-window-menu>
    </div>
</template>

<script>
export default {
    data() {
        return { isOpen: false };
    },
}
</script>
```

Example of z-index groups where windows on a lower group do not raise in from of windows of a higher group.

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window</aim-button>
        <aim-window-menu title="Group 0" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="0"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 0" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="0"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 0" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="0"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 1" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="1"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 1" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="1"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 1" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="1"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 2" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="2"
        ><h2>Content</h2></aim-window-menu>
        <aim-window-menu title="Group 2" :initHeight="100" v-model="isOpen" :initWidth="300"
            :zGroup="2"
        ><h2>Content</h2></aim-window-menu>

    </div>
</template>

<script>
export default {
    data() {
        return { isOpen: false };
    },
}
</script>
```

Example of open/close toggles for individual windows.

```
<template>
    <div>
        <aim-button-group>
            <aim-button @click="setWindowState(1, !windowState[1])">
                Toggle Window 1
            </aim-button>
            <aim-button @click="setWindowState(2, !windowState[2])">
                Toggle Window 2
            </aim-button>
            <aim-button @click="setWindowState(3, !windowState[3])">
                Toggle Window 3
            </aim-button>
            <aim-button @click="hideAll">
                Hide All
            </aim-button>
        </aim-button-group>
        <aim-window-menu title="Window 1"
            :initHeight="200" :initHeight="200"
            resizable
            :isOpen="windowState[1]"
            @update:isOpen="mode => setWindowState(1, mode)"
        >
            <h2>Window 1 Content</h2>
        </aim-window-menu>
        <aim-window-menu title="Window 2"
            :initWidth="400" :initHeight="200"
            resizable
            :isOpen="windowState[2]"
            @update:isOpen="mode => setWindowState(2, mode)"
        >
            <h2>Window 2 Content</h2>
        </aim-window-menu>
        <aim-window-menu title="Window 3"
            :initWidth="200" :initHeight="400"
            resizable
            :isOpen="windowState[3]"
            @update:isOpen="mode => setWindowState(3, mode)"
        >
            <h2>Window 3 Content</h2>
        </aim-window-menu>
    </div>
</template>

<script>
export default {
    data() {
        return { windowState: [null, false, false, false] };
    },
    mount() {
        console.log(windowState);
    },
    methods: {
        setWindowState(i, mode) { this.$set(this.windowState, i, mode); },
        hideAll() { this.windowState = [null, false, false, false]; }
    }
};
</script>
```