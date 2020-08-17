By default, windows are placed in the top left corner of the browser in a cascading manner.

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window</aim-button>
        <aim-window-menu
            title="Window Menu 1"
            :initHeight="100"
            v-model="isOpen"
        >
            <h2>Window 1 Content</h2>
        </aim-window-menu>
        <aim-window-menu
            title="Window Menu 2"
            :initHeight="100"
            v-model="isOpen"
        >
            <h2>Window 2 Content</h2>
        </aim-window-menu>
        <aim-window-menu
            title="Window Menu 3"
            :initHeight="100"
            v-model="isOpen"
        >
            <h2>Window 3 Content</h2>
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

There are different ways to position the window. The default method is used above. This way can also be selected by setting the `positionHint` props to 'auto'.
Another way to set the `positionHint` props to 'center' which places windows near the center of the browser in a cascading manner.
The last way is to set the coordinates directly using the props `initLeft` and `initTop`, overriding `positionHint`.

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window</aim-button>
        <aim-window-menu
            title="Center Window 1"
            :initHeight="100"
            positionHint="center"
            v-model="isOpen"
        >
            <h2>Window 1 Content</h2>
        </aim-window-menu>
        <aim-window-menu
            title="Center Window 2"
            :initHeight="100"
            positionHint="center"
            v-model="isOpen"
        >
            <h2>Window 2 Content</h2>
        </aim-window-menu>
        <aim-window-menu
            title="Center Window 3"
            :initHeight="100"
            positionHint="auto"
            v-model="isOpen"
        >
            <h2>Window 3 Content</h2>
        </aim-window-menu>
        <aim-window-menu
            title="Center Window 3"
            :initHeight="100"
            :initLeft="160"
            :initTop="200"
            v-model="isOpen"
        >
            <h2>Window 3 Content</h2>
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

Controlling window closing and opening is done using `v-model`. This is equivalent to the code below which uses `v-bind:isOpen` and `v-on:update:isOpen` (notice we are not using `v-bind:value` or `v-on:input` which is normally used with customized `v-model`).

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window</aim-button>
        <aim-window-menu
            title="Window Menu"
            :initHeight="200"
            positionHint="center"
            :isOpen=isOpen
            @update:isOpen="toggle"
            v-model="isOpen"
        >
            <h2>Window Content</h2>
        </aim-window-menu>
    </div>
</template>

<script>
export default {
    data() {
        return { isOpen: false };
    },
    methods: {
        toggle(mode) {
            this.isOpen = mode;
        }
    }
}
</script>
```
