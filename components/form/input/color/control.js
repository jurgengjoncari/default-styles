(function () {
    for (const control of document.querySelectorAll('input[type="color"]')) {
        function updateColor() {
            control.style.setProperty('--color-control-value', control.value);
        }

        control.addEventListener('input', updateColor);
        control.addEventListener('change', updateColor);
        updateColor();
    }
})();
