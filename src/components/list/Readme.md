Lists are placed inside a `aim-container` in panes and windows. Remember to make panes and windows enable scroll using the `overflow` prop.

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window List</aim-button>
        <aim-window-menu
            title="Window List"
            overflow="scroll"
            :initWidth="320"
            :initHeight="450"
            v-model="isOpen"
        >
            <aim-container pad="3">
                <aim-list>
                    <aim-list-item
                        v-for="image in mockSlideImages"
                        :key="image.id"
                    >
                        <img :src="image.thumbnail" />
                        <div class="spacing"></div>
                        <div class="content">
                            <div class="header">{{ image.name }}</div>
                            <div class="description">
                                Acquired on {{ image.acquisition_date }}
                            </div>
                            <div class="footer">
                                Uploaded by {{ image.author }}
                            </div>
                        </div>
                    </aim-list-item>
                </aim-list>
            </aim-container>
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

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container :flexPaneIndex="1"
        :initWidth="320" :minWidth="320" :maxWidth="320"
    >
        <aim-pane-menu
            title="Pane List"
            overflow="scroll"
        >
            <aim-container pad="3">
                <aim-list>
                    <aim-list-item
                        v-for="image in mockSlideImages"
                        :key="image.id"
                    >
                        <img :src="image.thumbnail" />
                        <div class="spacing"></div>
                        <div class="content">
                            <div class="header">{{ image.name }}</div>
                            <div class="description">
                                Acquired on {{ image.acquisition_date }}
                            </div>
                            <div class="footer">
                                Uploaded by {{ image.author }}
                            </div>
                        </div>
                    </aim-list-item>
                </aim-list>
            </aim-container>
        </aim-pane-menu>
        <div>
            <h2>Flex Content</h2>
        </div>
    </aim-pane-container>
</aim-container>
```

The padding and margins used in lists can be adjusted by setting the `pad` prop in the `aim-container` that the list is immediately contained in. As of this writing, the padding options are 0, 1, 2, 3.

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container :flexPaneIndex="2"
        :initWidth="320" :minWidth="320" :maxWidth="320"
    >
        <aim-pane-menu
            title="Paddig 1"
            overflow="scroll"
        >
            <aim-container pad="1">
                <aim-list>
                    <aim-list-item
                        v-for="image in mockSlideImages"
                        :key="image.id"
                    >
                        <img :src="image.thumbnail" />
                        <div class="spacing"></div>
                        <div class="content">
                            <div class="header">{{ image.name }}</div>
                            <div class="description">
                                Acquired on {{ image.acquisition_date }}
                            </div>
                            <div class="footer">
                                Uploaded by {{ image.author }}
                            </div>
                        </div>
                    </aim-list-item>
                </aim-list>
            </aim-container>
        </aim-pane-menu>
        <aim-pane-menu
            title="Padding 2"
            overflow="scroll"
        >
            <aim-container pad="2">
                <aim-list>
                    <aim-list-item
                        v-for="image in mockSlideImages"
                        :key="image.id"
                    >
                        <img :src="image.thumbnail" />
                        <div class="spacing"></div>
                        <div class="content">
                            <div class="header">{{ image.name }}</div>
                            <div class="description">
                                Acquired on {{ image.acquisition_date }}
                            </div>
                            <div class="footer">
                                Uploaded by {{ image.author }}
                            </div>
                        </div>
                    </aim-list-item>
                </aim-list>
            </aim-container>
        </aim-pane-menu>
        <div>
        </div>
    </aim-pane-container>
</aim-container>
```
