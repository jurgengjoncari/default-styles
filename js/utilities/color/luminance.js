export function getLuminance(color) {
    const [red, green, blue] = [1, 3, 5]
        .map((offset) => Number.parseInt(color.slice(offset, offset + 2), 16) / 255)
        .map((channel) =>
            channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
        );

    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}