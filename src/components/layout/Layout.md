The layout for Aim UI is very loosely based on [the Bootstrap Vue layout](https://bootstrap-vue.org/docs/components/layout). Generally containers contain one or more rows (or lists and sections). Rows contain one or more columns.

```
<aim-container flex>
    <aim-row flex>
        <aim-col class="blue pad">row 1 col 1
        </aim-col>
        <aim-col class="blue pad">row 1 col 2
        </aim-col>
    </aim-row>
    <aim-row flex>
        <aim-col class="red pad">row 2 col 1
        </aim-col>
        <aim-col class="red pad">row 2 col 2
        </aim-col>
    </aim-row>
</aim-container>
```

Examples of the `flexItem` prop.

```
<aim-container flex :style="{height: '150px', width: '100%'}">
    <aim-row flex flexItem="fill">
        <aim-col class="blue pad">row 1 col 1
        </aim-col>
        <aim-col class="blue pad">row 1 col 2
        </aim-col>
    </aim-row>
    <aim-row flex>
        <aim-col class="red pad">row 2 col 1
        </aim-col>
        <aim-col class="red pad">row 2 col 2
        </aim-col>
    </aim-row>
</aim-container>
```

```
<aim-container flex>
    <aim-row flex>
        <aim-col flexItem="fill" class="blue pad">row 1 col 1
        </aim-col>
        <aim-col class="blue pad">row 1 col 2
        </aim-col>
    </aim-row>
    <aim-row flex>
        <aim-col class="red pad">row 2 col 1
        </aim-col>
        <aim-col flexItem="fill" class="red pad">row 2 col 2
        </aim-col>
    </aim-row>
    <aim-row flex>
        <aim-col flexItem="fill" class="purple pad">row 3 col 1
        </aim-col>
        <aim-col flexItem="fill" class="purple pad">row 3 col 2
        </aim-col>
    </aim-row>
</aim-container>
```

Example of the `flexWrap` prop. By default columns and rows don't wrap. You can also use `flexWrap="forward"` or `flexWrap="backward"` to control wrapping.

```
<aim-container flex>
    <aim-row flex flexWrap>
        <aim-col class="blue pad">row 1 col 1</aim-col>
        <aim-col class="blue pad">row 1 col 2</aim-col>
        <aim-col class="blue pad">row 1 col 3</aim-col>
        <aim-col class="blue pad">row 1 col 4</aim-col>
        <aim-col class="blue pad">row 1 col 5</aim-col>
        <aim-col class="blue pad">row 1 col 6</aim-col>
        <aim-col class="blue pad">row 1 col 7</aim-col>
        <aim-col class="blue pad">row 1 col 8</aim-col>
        <aim-col class="blue pad">row 1 col 9</aim-col>
    </aim-row>
    <aim-row flex flexWrap="backward">
        <aim-col class="red pad">row 1 col 1</aim-col>
        <aim-col class="red pad">row 1 col 2</aim-col>
        <aim-col class="red pad">row 1 col 3</aim-col>
        <aim-col class="red pad">row 1 col 4</aim-col>
        <aim-col class="red pad">row 1 col 5</aim-col>
        <aim-col class="red pad">row 1 col 6</aim-col>
        <aim-col class="red pad">row 1 col 7</aim-col>
        <aim-col class="red pad">row 1 col 8</aim-col>
        <aim-col class="red pad">row 1 col 9</aim-col>
    </aim-row>
    <aim-row flex flexWrap="none">
        <aim-col class="purple pad">row 1 col 1</aim-col>
        <aim-col class="purple pad">row 1 col 2</aim-col>
        <aim-col class="purple pad">row 1 col 3</aim-col>
        <aim-col class="purple pad">row 1 col 4</aim-col>
        <aim-col class="purple pad">row 1 col 5</aim-col>
        <aim-col class="purple pad">row 1 col 6</aim-col>
        <aim-col class="purple pad">row 1 col 7</aim-col>
        <aim-col class="purple pad">row 1 col 8</aim-col>
        <aim-col class="purple pad">row 1 col 9</aim-col>
    </aim-row>
</aim-container>
```

Example of the `alignM` (align along main axis) prop.

```
<aim-container flex :style="{height: '150px', width: '100%'}">
    <aim-row flex alignM="center">
        <aim-col class="blue pad">row 1 col 1</aim-col>
        <aim-col class="blue pad">row 1 col 2</aim-col>
        <aim-col class="blue pad">row 1 col 3</aim-col>
        <aim-col class="blue pad">row 1 col 4</aim-col>
        <aim-col class="blue pad">row 1 col 5</aim-col>
    </aim-row>
    <aim-row flex alignM="between">
        <aim-col class="red pad">row 1 col 1</aim-col>
        <aim-col class="red pad">row 1 col 2</aim-col>
        <aim-col class="red pad">row 1 col 3</aim-col>
        <aim-col class="red pad">row 1 col 4</aim-col>
        <aim-col class="red pad">row 1 col 5</aim-col>
    </aim-row>
    <aim-row flex alignM="end">
        <aim-col class="purple pad">row 1 col 1</aim-col>
        <aim-col class="purple pad">row 1 col 2</aim-col>
        <aim-col class="purple pad">row 1 col 3</aim-col>
        <aim-col class="purple pad">row 1 col 4</aim-col>
        <aim-col class="purple pad">row 1 col 5</aim-col>
    </aim-row>
</aim-container>
```