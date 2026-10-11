const root = document.documentElement;
const colorSchemePreference = window.matchMedia('(prefers-color-scheme: dark)');
const knownThemeModes = ['system', 'light', 'dark'];
// let updateSurfaceStrengthLimit = () => {};
const rootThemeMode = root.getAttribute('data-theme-mode');
let themeMode = knownThemeModes.includes(rootThemeMode)
    ? rootThemeMode
    : knownThemeModes.includes(root.getAttribute('data-theme'))
        ? root.getAttribute('data-theme')
        : 'system';

function applyTheme(mode) {
    themeMode = mode;
    root.setAttribute('data-theme-mode', mode);
    root.setAttribute(
        'data-theme',
        mode === 'system' ? (colorSchemePreference.matches ? 'dark' : 'light') : mode
    );
    // updateSurfaceStrengthLimit();
}

applyTheme(themeMode);
colorSchemePreference.addEventListener('change', () => {
    if (themeMode === 'system') {
        applyTheme('system');
    }
});

export function bindThemeControl(panel) {
    panel.addEventListener('change', (event) => {
        const control = event.target;
        if (control instanceof HTMLInputElement && control.type === 'radio'
            && control.name === 'default-styles-theme-mode' && control.checked) {
            applyTheme(control.value);
        }
    });

    const selectedTheme = panel.querySelector(
        'input[name="default-styles-theme-mode"][value="' + themeMode + '"]'
    );
    selectedTheme.checked = true;
}