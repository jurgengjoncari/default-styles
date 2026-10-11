export function mix(color, target, amount) {
    const channels = [1, 3, 5].map((offset) => {
        const start = Number.parseInt(color.slice(offset, offset + 2), 16);
        const end = Number.parseInt(target.slice(offset, offset + 2), 16);
        return Math.round(start + (end - start) * amount).toString(16).padStart(2, '0');
    });

    return '#' + channels.join('');
}