Basic usage:

```
<aim-expand-button text="Expand Me">
    <aim-button>Expandable 1</aim-button>
    <aim-button>Expandable 2</aim-button>
    <aim-button>Expandable 3</aim-button>
</aim-expand-button>
```

Make the expand button initially open with `startOpen`:

```
<aim-expand-button text="Expand Me" startOpen>
    <aim-button>Expandable 1</aim-button>
    <aim-button>Expandable 2</aim-button>
    <aim-button>Expandable 3</aim-button>
</aim-expand-button>
```

Combine expand button with with other buttons:

```
<aim-button-group>
    <aim-button>Click Me</aim-button>
    <aim-button>Click Me</aim-button>
    <aim-expand-button text="Expand Me">
        <aim-button>Expandable 1</aim-button>
        <aim-button>Expandable 2</aim-button>
        <aim-button>Expandable 3</aim-button>
    </aim-expand-button>
</aim-button-group>
```