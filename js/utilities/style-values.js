export function getCssLengthInPixels(element, property, fallback) {
    const value = getComputedStyle(element).getPropertyValue(property).trim();
    if (!value) {
        return fallback;
    }

    const probe = document.createElement('span');
    probe.style.cssText = 'position:fixed;visibility:hidden;display:block;width:'
        + value + ';';
    (document.body || document.documentElement).append(probe);
    const pixels = Number.parseFloat(getComputedStyle(probe).width);
    probe.remove();
    return Number.isFinite(pixels) ? pixels : fallback;
}

export function getCssColorAsHex(element, property, fallback) {
    const color = getComputedStyle(element).getPropertyValue(property).trim();
    if (!color || !CSS.supports('color', color)) {
        return fallback;
    }

    const input = document.createElement('input');
    input.type = 'color';
    input.value = color;
    return input.value;
}