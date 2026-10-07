export function getLuminance(color) {
    const [red, green, blue] = [1, 3, 5]
        .map((offset) => Number.parseInt(color.slice(offset, offset + 2), 16) / 255)
        .map((channel) =>
            channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
        );

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getContrastingTextColor(color) {
    const luminance = getLuminance(color);
    const blackContrast = (luminance + 0.05) / 0.05;
    const whiteContrast = 1.05 / (luminance + 0.05);

    return blackContrast >= whiteContrast ? '#000000' : '#ffffff';
}

export function mix(color, target, amount) {
    const channels = [1, 3, 5].map((offset) => {
        const start = Number.parseInt(color.slice(offset, offset + 2), 16);
        const end = Number.parseInt(target.slice(offset, offset + 2), 16);
        return Math.round(start + (end - start) * amount).toString(16).padStart(2, '0');
    });

    return `#${channels.join('')}`;
}

export function getContrastRatio(color, background) {
    const lighter = Math.max(getLuminance(color), getLuminance(background));
    const darker = Math.min(getLuminance(color), getLuminance(background));
    return (lighter + 0.05) / (darker + 0.05);
}

export function getAccessibleAccent(color, background, minimumContrast = 4.5) {
    if (getContrastRatio(color, background) >= minimumContrast) {
        return color;
    }

    const target = getLuminance(background) >= 0.5 ? '#000000' : '#ffffff';
    let low = 0;
    let high = 1;

    for (let iteration = 0; iteration < 12; iteration += 1) {
        const middle = (low + high) / 2;
        const candidate = mix(color, target, middle);
        if (getContrastRatio(candidate, background) >= minimumContrast) {
            high = middle;
        } else {
            low = middle;
        }
    }

    return mix(color, target, high);
}
