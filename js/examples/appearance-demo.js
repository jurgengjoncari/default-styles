(function () {
    const colorUtilities = window.ColorUtilities;
    if (!colorUtilities) {
        throw new Error('Load js/utilities/color.js before js/examples/appearance-demo.js.');
    }

    const primaryColor = document.getElementById('primary-color');
    const primaryColorValue = document.getElementById('primary-color-value');

    function updatePrimaryColor() {
        const color = primaryColor.value;
        const lightBackground = colorUtilities.mix(color, '#ffffff', 0.85);
        const darkBackground = colorUtilities.mix('#000000', color, 0.25);
        const lightText = colorUtilities.getAccessibleAccent(color, lightBackground);
        const darkText = colorUtilities.getAccessibleAccent(color, darkBackground);

        document.documentElement.style.setProperty('--primary-color', color);
        document.documentElement.style.setProperty(
            '--primary-color-contrast',
            colorUtilities.getContrastingTextColor(color)
        );
        document.documentElement.style.setProperty('--primary-text-light', lightText);
        document.documentElement.style.setProperty('--primary-text-dark', darkText);
        primaryColorValue.value = color;
        primaryColorValue.textContent = color;
    }

    primaryColor.addEventListener('input', updatePrimaryColor);
    updatePrimaryColor();
})();
