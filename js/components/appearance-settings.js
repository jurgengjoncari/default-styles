import {
    getAccessibleAccent,
    getContrastingTextColor,
    mix
} from '../utilities/color.js';
import { initializeFloatingPanels } from './floating-panel.js';

const root = document.documentElement;
const colorSchemePreference = window.matchMedia('(prefers-color-scheme: dark)');
const knownThemeModes = ['system', 'light', 'dark'];
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
}

applyTheme(themeMode);
colorSchemePreference.addEventListener('change', () => {
    if (themeMode === 'system') {
        applyTheme('system');
    }
});

function readLengthInPixels(property, fallback) {
    const probe = document.createElement('span');
    probe.style.cssText = `position:fixed;visibility:hidden;display:block;width:var(${property});`;
    document.body.append(probe);
    const value = Number.parseFloat(getComputedStyle(probe).width);
    probe.remove();
    return Number.isFinite(value) ? value : fallback;
}

function readColorAsHex(property, fallback) {
    const color = getComputedStyle(root).getPropertyValue(property).trim();
    if (!CSS.supports('color', color)) {
        return fallback;
    }

    const input = document.createElement('input');
    input.type = 'color';
    input.value = color;
    return input.value;
}

function createAppearancePanel() {
    if (document.querySelector('[data-default-styles-appearance]')) {
        throw new Error('Only one default-styles appearance panel can be installed per page.');
    }

    const panel = document.createElement('div');
    panel.className = 'floating-panel';
    panel.dataset.floatingPanel = '';
    panel.dataset.defaultStylesAppearance = '';
    panel.innerHTML = `
        <button type="button" class="floating-panel__trigger"
            data-floating-panel-trigger aria-controls="default-styles-appearance-content"
            aria-expanded="false" aria-label="Open appearance settings">
            <span class="floating-panel__icon" aria-hidden="true"></span>
        </button>
        <div class="floating-panel__content settings-panel" id="default-styles-appearance-content"
            data-floating-panel-content aria-hidden="true" inert>
            <div class="floating-panel__header" data-floating-panel-drag-handle aria-hidden="true">
                <span>Appearance settings</span>
            </div>
            <div class="settings-panel__item">
                <fieldset class="form-field form-field--group">
                    <legend class="sr-only">Theme</legend>
                    <div class="form-field__row">
                        <span class="form-field__label" aria-hidden="true">Theme</span>
                        <div class="button-group" data-variant="primary">
                            <label class="button-group__option">
                                <input type="radio" name="default-styles-theme-mode"
                                    value="system" checked>
                                <span>System</span>
                            </label>
                            <label class="button-group__option">
                                <input type="radio" name="default-styles-theme-mode" value="light">
                                <span>Light</span>
                            </label>
                            <label class="button-group__option">
                                <input type="radio" name="default-styles-theme-mode" value="dark">
                                <span>Dark</span>
                            </label>
                        </div>
                    </div>
                </fieldset>
            </div>
            <div class="settings-panel__item">
                <label class="form-field form-field--color" for="default-styles-primary-color">
                    <span class="form-field__label">Primary color</span>
                    <input id="default-styles-primary-color" type="color" value="#1a44cc">
                    <output class="form-field__output" for="default-styles-primary-color">#1a44cc</output>
                </label>
            </div>
            <div class="settings-panel__item">
                <label class="form-field" for="default-styles-control-radius">
                    <span class="form-field__label">Corner radius</span>
                    <input id="default-styles-control-radius" type="range"
                        min="0" max="24" step="1" value="4">
                    <output class="form-field__output" for="default-styles-control-radius">4px</output>
                </label>
            </div>
            <div class="settings-panel__item">
                <label class="form-field" for="default-styles-border-width">
                    <span class="form-field__label">Border width</span>
                    <input id="default-styles-border-width" type="range"
                        min="0" max="4" step="1" value="1">
                    <output class="form-field__output" for="default-styles-border-width">1px</output>
                </label>
            </div>
            <div class="settings-panel__item">
                <label class="form-field" for="default-styles-font-scale">
                    <span class="form-field__label">Font scale</span>
                    <input id="default-styles-font-scale" type="number"
                        min="75" max="150" step="5" value="100"
                        aria-label="Font scale percentage">
                    <output class="form-field__output" for="default-styles-font-scale">100%</output>
                </label>
            </div>
            <div class="settings-panel__item">
                <label class="form-field form-field--select" for="default-styles-font-family">
                    <span class="form-field__label">Font family</span>
                    <select id="default-styles-font-family">
                        <option value="">Default</option>
                        <option value="system-ui, sans-serif">System UI</option>
                        <option value='Georgia, "Times New Roman", serif'>Serif</option>
                        <option value="var(--font-family-monospace)">Monospace</option>
                    </select>
                </label>
            </div>
        </div>
    `;

    panel.addEventListener('change', (event) => {
        const control = event.target;
        if (control instanceof HTMLInputElement && control.type === 'radio'
            && control.name === 'default-styles-theme-mode' && control.checked) {
            applyTheme(control.value);
        }
    });

    function updateAppearance(event) {
        const control = event.target;
        if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement)) {
            return;
        }

        if (control.id === 'default-styles-primary-color') {
            const color = control.value;
            const lightBackground = mix(color, '#ffffff', 0.85);
            const darkBackground = mix('#000000', color, 0.25);
            root.style.setProperty('--primary-color', color);
            root.style.setProperty('--primary-color-contrast', getContrastingTextColor(color));
            root.style.setProperty(
                '--primary-text-light',
                getAccessibleAccent(color, lightBackground)
            );
            root.style.setProperty(
                '--primary-text-dark',
                getAccessibleAccent(color, darkBackground)
            );
            control.style.setProperty('--color-control-value', color);
            panel.querySelector('output[for="default-styles-primary-color"]').textContent = color;
            return;
        }

        if (control instanceof HTMLInputElement && control.type === 'radio') {
            return;
        }

        if (control instanceof HTMLInputElement && control.type === 'number'
            && control.value === '') {
            root.style.removeProperty('--root-font-scale');
            panel.querySelector(`output[for="${control.id}"]`).textContent = '';
            return;
        }

        if (control instanceof HTMLInputElement && !control.validity.valid) {
            return;
        }

        const variableById = {
            'default-styles-control-radius': ['--radius-control', 'px'],
            'default-styles-border-width': ['--border-width-thin', 'px'],
            'default-styles-font-scale': ['--root-font-scale', '%']
        };
        const variable = variableById[control.id];
        if (variable) {
            root.style.setProperty(variable[0], `${control.value}${variable[1]}`);
            panel.querySelector(`output[for="${control.id}"]`).textContent =
                `${control.value}${variable[1]}`;
        } else if (control.id === 'default-styles-font-family') {
            if (control.value) {
                root.style.setProperty('--font-family-base', control.value);
            } else {
                root.style.removeProperty('--font-family-base');
            }
        }
    }

    panel.addEventListener('input', updateAppearance);
    panel.addEventListener('change', updateAppearance);

    document.body.append(panel);
    const computedRoot = getComputedStyle(root);
    const selectedTheme = panel.querySelector(
        `input[name="default-styles-theme-mode"][value="${themeMode}"]`
    );
    selectedTheme.checked = true;

    const primaryColor = panel.querySelector('#default-styles-primary-color');
    primaryColor.value = readColorAsHex('--primary-color', primaryColor.value);
    primaryColor.style.setProperty('--color-control-value', primaryColor.value);
    panel.querySelector('output[for="default-styles-primary-color"]').textContent =
        primaryColor.value;

    const radius = panel.querySelector('#default-styles-control-radius');
    radius.max = Math.max(Number(radius.max), Math.ceil(readLengthInPixels('--radius-control', 4)));
    radius.value = readLengthInPixels('--radius-control', 4);
    panel.querySelector('output[for="default-styles-control-radius"]').textContent =
        `${radius.value}px`;

    const borderWidth = panel.querySelector('#default-styles-border-width');
    borderWidth.max = Math.max(
        Number(borderWidth.max),
        Math.ceil(readLengthInPixels('--border-width-thin', 1))
    );
    borderWidth.value = readLengthInPixels('--border-width-thin', 1);
    panel.querySelector('output[for="default-styles-border-width"]').textContent =
        `${borderWidth.value}px`;

    const fontScale = panel.querySelector('#default-styles-font-scale');
    const currentFontScale = Number.parseFloat(
        computedRoot.getPropertyValue('--root-font-scale')
    );
    fontScale.value = Number.isFinite(currentFontScale) ? currentFontScale : 100;
    panel.querySelector('output[for="default-styles-font-scale"]').textContent =
        `${fontScale.value}%`;

    const fontFamily = panel.querySelector('#default-styles-font-family');
    const currentFontFamily = computedRoot.getPropertyValue('--font-family-base').trim();
    if (currentFontFamily && ![...fontFamily.options].some((option) =>
        option.value === currentFontFamily)) {
        const currentOption = new Option('Current app font', currentFontFamily);
        fontFamily.add(currentOption, 1);
        fontFamily.value = currentFontFamily;
    }

    initializeFloatingPanels(panel);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAppearancePanel, { once: true });
} else {
    createAppearancePanel();
}
