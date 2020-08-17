### Horizontal Collapse

Basic usage:

```
<template>
    <div>
        <aim-button @click="toggleCollapse">Toggle Collapse</aim-button>
        <aim-h-collapse>
            <div class="content" v-if="!isCollapsed">
                <h2>Collapsible content</h2>
            </div>
        </aim-h-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: true
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
};
</script>

<style scoped>
.content {
    overflow: hidden;
    white-space: nowrap;
}
</style>
```

Use `apear` to show the collapse transition when the web application loads. See [Vue.js docs](https://vuejs.org/v2/guide/transitions.html#Transitions-on-Initial-Render) for more details.

```
<template>
    <div>
        <aim-button @click="toggleCollapse">Toggle Collapse</aim-button>
        <aim-h-collapse appear>
            <div class="content" v-if="!isCollapsed">
                <h2>Collapsible content</h2>
            </div>
        </aim-h-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: false
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
};
</script>

<style scoped>
.content {
    overflow: hidden;
    white-space: nowrap;
}
</style>
```

### Vertical Collapse

Basic usage:

```
<template>
    <div>
        <aim-button @click="toggleCollapse">Toggle Collapse</aim-button>
        <aim-v-collapse>
            <div class="content" v-if="!isCollapsed">
                <h3>Collapsible content</h3>
                <h3>Collapsible content</h3>
                <h3>Collapsible content</h3>
            </div>
        </aim-v-collapse>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: true
        };
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        }
    }
};
</script>

<style scoped>
.content {
    overflow: hidden;
    white-space: nowrap;
}
</style>
```
