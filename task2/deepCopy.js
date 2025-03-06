function deepCopy(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (seen.has(obj)) return seen.get(obj);

    const clone = Array.isArray(obj) ? [] : {};

    seen.set(obj, clone);

    Object.keys(obj).forEach(key => {
        clone[key] = deepCopy(obj[key], seen);
    });

    if (obj instanceof Date) return new Date(obj);

    if (obj instanceof Map) {
        const mapClone = new Map();
        obj.forEach((value, key) => {
            mapClone.set(deepCopy(key, seen), deepCopy(value, seen));
        });
        return mapClone;
    }

    if (obj instanceof Set) {
        const setClone = new Set();
        obj.forEach(value => {
            setClone.add(deepCopy(value, seen));
        });
        return setClone;
    }

    return clone;
}
