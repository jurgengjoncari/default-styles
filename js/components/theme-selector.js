(function () {
    const root = document.documentElement;
    const colorSchemePreference = window.matchMedia('(prefers-color-scheme: dark)');

    function applyMode(mode) {
        root.setAttribute('data-theme-mode', mode);
        root.setAttribute(
            'data-theme',
            mode === 'system' ? (colorSchemePreference.matches ? 'dark' : 'light') : mode
        );
    }

    function applySystemPreference() {
        if (root.getAttribute('data-theme-mode') === 'system') {
            applyMode('system');
        }
    }

    root.setAttribute('data-theme-mode', 'system');
    applySystemPreference();
    colorSchemePreference.addEventListener('change', applySystemPreference);

    document.addEventListener('change', (event) => {
        const control = event.target;
        if (control instanceof HTMLInputElement
            && control.matches('[data-theme-selector]')
            && control.checked) {
            applyMode(control.value);
        }
    });
})();
