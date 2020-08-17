Container flanked by multiple collapsable `aim-pane-menu` side panes.

### Horizontal Panes

Below is an example of a horizontal pane on the left hand side.
Normally, pane components are represented by `aim-pane-menu` components.
Each pane is adjustable by dragging the pane resizers between the panes.
Each `aim-pane-menu` is collapsable by clicking its close button.

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container :flexPaneIndex="1">
        <aim-pane-menu title="Left Pane">
            <h2>Pane Content</h2>
        </aim-pane-menu>
        <div>
            <h2>Flex Content</h2>
        </div>
    </aim-pane-container>
</aim-container>
```

Horizontal pane on the right hand side with multiple tabs.

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container :flexPaneIndex="0">
        <div>
            <h2>Flex Content</h2>
        </div>
        <aim-pane-menu title="Right Pane">
            <aim-tabs>
                <aim-tab title="Tab 1">
                    <h2>Right Pane's Tab 1 Content</h2>
                </aim-tab>
                <aim-tab title="Tab 2">
                    <h2>Right Pane's Tab 2 Content</h2>
                </aim-tab>
                <aim-tab title="Tab 3">
                    <h2>Right Pane's Tab 3 Content</h2>
                </aim-tab>
            </aim-tabs>
        </aim-pane-menu>
    </aim-pane-container>
</aim-container>
```

The initial, maximum and minimum pane widths across all panes can be set using the props `initWidth`, `maxWidth` and `minWidth`. See below for an example of horizontal panes on both sides with sizes set.

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container
        :flexPaneIndex="2"
        :initWidth="100"
        :minWidth="70"
        :maxWidth="150"
    >
        <aim-pane-menu title="Pane 1">
            <h2>Pane 1</h2>
        </aim-pane-menu>
        <aim-pane-menu title="Pane 2">
            <h2>Pane 2</h2>
        </aim-pane-menu>
        <div>
            <h2>Flex Content</h2>
        </div>
        <aim-pane-menu title="Pane 3">
            <h2>Pane 3</h2>
        </aim-pane-menu>
        <aim-pane-menu title="Pane 4">
            <h2>Pane 4</h2>
        </aim-pane-menu>
    </aim-pane-container>
</aim-container>
```

You have to manually give index specifying which of the `aim-pane-container`'s children is the fluid content that rests between the panes by setting the prop `flexPaneIndex`. The index uses 0-based numbering. In the example below, of the children in `aim-pane-container` the one in index 0 is 'Pane 1', ..., and the one in index 3 is the `<div>` that contains flex content.

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container
        :flexPaneIndex="3"
        :initWidth="100"
        :minWidth="70"
        :maxWidth="150"
    >
        <aim-pane-menu title="Pane 1">
            <h2>Pane 1</h2>
        </aim-pane-menu>
        <aim-pane-menu title="Pane 2">
            <h2>Pane 2</h2>
        </aim-pane-menu>
        <aim-pane-menu title="Pane 3">
            <h2>Pane 3</h2>
        </aim-pane-menu>
        <div>
            <h2>Flex Content</h2>
        </div>
        <aim-pane-menu title="Pane 4">
            <h2>Pane 4</h2>
        </aim-pane-menu>
    </aim-pane-container>
</aim-container>
```

### Vertical Panes

Vertical panes have not been fully implemented yet.