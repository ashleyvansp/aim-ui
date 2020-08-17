/**
 * Map of number key and ZElement value
 */
const registry = new Map();
const BASE = 1;

/**
 * @param {number} group 
 * @returns {Array.<ZElement>}
 */
function a(group) {
    if (!registry.has(group))
        registry.set(group, []);
    return registry.get(group);
}

function keys(map) {
    const keys = [];
    map.forEach((v, k) => keys.push(k));
    return keys;
}

function refresh() {
    let zIndex = BASE
    for (const g of keys(registry).sort(compare)) {
        for (const z of a(g)) {
            if (zIndex != z.zIndex) {
                z.zIndex = zIndex
                z.onChange(zIndex)
            }
            zIndex++
        }
    }
}

function compare(a, b) {
    if (a > b)
        return - compare(b, a);
    // always a <= b
    if (a < 0) {
        if (b >= 0)
            return 1;
        return a - b;
    }
    return a - b;
}

export class ZElement {

    constructor(group, onChange) {
        this._group = group;
        this.onChange = onChange;
        this.a(a => a.push(this));
    }

    set group(group) {
        this._group = group;
        const a1 = a(this._group);
        const a2 = a(group);
        a1.splice(a1.indexOf(this), 1);
        a2.push(this);
        refresh()
    }

    get group() {
        return this._group;
    }

    unregister() {
        this.a(a => a.splice(a.indexOf(this), 1))
    }

    raise() {
        this.a(a => {
            a.splice(a.indexOf(this), 1)
            a.push(this)
        });
    }

    /**
     * @private
     * @param {function} cb 
     */
    a(cb) {
        cb(a(this._group));
        refresh();
    }
}