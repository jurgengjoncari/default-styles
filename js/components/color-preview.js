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
            const backgroundColor = getComputedStyle(document.documentElement)
                .getPropertyValue('--background-color')
                .trim();

            preview.style.setProperty('--button-bg', color);
            preview.style.setProperty('--button-text', colorUtilities.getContrastingTextColor(color));
            preview.style.setProperty(
                '--button-accessible-color',
                colorUtilities.getAccessibleAccent(color, backgroundColor, 7)
            );
        }

        input.addEventListener('input', updatePreview);
        updatePreview();

        new MutationObserver(updatePreview).observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
})();
