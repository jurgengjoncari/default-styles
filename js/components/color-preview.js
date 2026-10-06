(function () {
    const colorUtilities = window.ColorUtilities;

    if (!colorUtilities) {
        throw new Error('Load js/utilities/color.js before js/components/color-preview.js.');
    }

    for (const preview of document.querySelectorAll('[data-color-preview]')) {
        const input = preview.querySelector('[data-color-preview-input]');
        if (!input) {
            throw new Error('A color preview component requires a [data-color-preview-input] control.');
        }

        function updatePreview() {
            const color = input.value;
            const stateColor = colorUtilities.getLuminance(color) > 0.179 ? '#000000' : '#ffffff';
            const hoverColor = colorUtilities.mix(color, stateColor, 0.12);
            const activeColor = colorUtilities.mix(color, stateColor, 0.24);

            preview.style.setProperty('--button-bg', color);
            preview.style.setProperty('--button-text', colorUtilities.getContrastingTextColor(color));
            preview.style.setProperty('--button-hover-bg', hoverColor);
            preview.style.setProperty('--button-hover-text', colorUtilities.getContrastingTextColor(hoverColor));
            preview.style.setProperty('--button-active-bg', activeColor);
            preview.style.setProperty('--button-active-text', colorUtilities.getContrastingTextColor(activeColor));
        }

        input.addEventListener('input', updatePreview);
        updatePreview();
    }
})();
