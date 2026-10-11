import { getAccessibleAccent, getContrastingTextColor } from '../../../js/utilities/color/contrast.js';
import { mix } from '../../../js/utilities/color/mix.js';
import {
    getCssColorAsHex,
    getCssLengthInPixels
} from '../../../js/utilities/style-values.js';

const root = document.documentElement;

/* Archived transparency cap experiment:
function parseCssColor(color) {
    const value = color.trim();
    const hexMatch = value.match(/^#([\da-f]{3}|[\da-f]{6})$/i);
    if (hexMatch) {
        const hex = hexMatch[1];
        const channels = hex.length === 3
            ? [...hex].map((channel) => Number.parseInt(channel + channel, 16))
            : [0, 2, 4].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16));
        return { channels, alpha: 1 };
    }

    const rgbMatch = value.match(/^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i);
    if (!rgbMatch) {
        return null;
    }
    return {
        channels: rgbMatch.slice(1, 4).map(Number),
        alpha: Number(rgbMatch[4] ?? 1)
    };
}

function compositeColor(foreground, background, alpha = foreground.alpha) {
    return foreground.channels.map((channel, index) =>
        channel * alpha + background[index] * (1 - alpha)
    );
}

function getRelativeLuminance(channels) {
    const [red, green, blue] = channels.map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function getContrastRatio(firstColor, secondColor) {
    const first = getRelativeLuminance(firstColor);
    const second = getRelativeLuminance(secondColor);
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

function getMaximumSurfaceStrength(maximumLayers = 3, minimumContrast = 4.5) {
    const styles = getComputedStyle(root);
    const background = parseCssColor(styles.getPropertyValue('--background-color'));
    const foreground = parseCssColor(styles.getPropertyValue('--color'));
    const surface = parseCssColor(styles.getPropertyValue('--color-surface-color'));
    if (!background || !foreground || !surface) {
        return 0;
    }

    let low = 0;
    let high = 1;
    for (let iteration = 0; iteration < 24; iteration += 1) {
        const strength = (low + high) / 2;
        let layeredBackground = background.channels;
        for (let layer = 0; layer < maximumLayers; layer += 1) {
            layeredBackground = compositeColor(surface, layeredBackground, strength);
        }
        const renderedText = compositeColor(foreground, layeredBackground);
        if (getContrastRatio(renderedText, layeredBackground) >= minimumContrast) {
            low = strength;
        } else {
            high = strength;
        }
    }

    return Math.floor(low * 100);
}
*/

/* Independent handlers for each setting. */
function setOutput(panel, controlId, value) {
    panel.querySelector('output[for="' + controlId + '"]').textContent = value;
}

function updatePrimaryColor(control, panel) {
    const color = control.value;
    const lightBackground = mix(color, '#ffffff', 0.85);
    const darkBackground = mix('#000000', color, 0.25);

    root.style.setProperty('--primary-color', color);
    root.style.setProperty('--primary-color-contrast', getContrastingTextColor(color));
    root.style.setProperty('--primary-text-light', getAccessibleAccent(color, lightBackground));
    root.style.setProperty('--primary-text-dark', getAccessibleAccent(color, darkBackground));
    control.style.setProperty('--color-control-value', color);
    setOutput(panel, control.id, color);
}

function updateCssVariable(control, panel, variable, unit) {
    const value = String(control.value) + unit;
    root.style.setProperty(variable, value);
    setOutput(panel, control.id, value);
}

function updateFontFamily(control) {
    if (control.value) {
        root.style.setProperty('--font-family-base', control.value);
    } else {
        root.style.removeProperty('--font-family-base');
    }
}

const controlHandlers = new Map([
    ['default-styles-primary-color', updatePrimaryColor],
    ['default-styles-control-radius', (control, panel) =>
        updateCssVariable(control, panel, '--radius-control', 'px')],
    ['default-styles-border-width', (control, panel) =>
        updateCssVariable(control, panel, '--border-width-thin', 'px')],
    ['default-styles-font-scale', (control, panel) =>
        updateCssVariable(control, panel, '--root-font-scale', '%')],
    ['default-styles-font-family', updateFontFamily]
]);

function updateAppearance(panel, event) {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement)
        || (control instanceof HTMLInputElement && control.type === 'radio')) {
        return;
    }

    if (control instanceof HTMLInputElement && control.type === 'number'
        && control.id === 'default-styles-font-scale'
        && control.value === '') {
        root.style.removeProperty('--root-font-scale');
        setOutput(panel, control.id, '');
        return;
    }

    if (control instanceof HTMLInputElement && !control.validity.valid) {
        return;
    }

    /* Archived transparency event handler:
        if (control.id === 'default-styles-surface-transparency') {
            root.style.setProperty('--surface-strength-adjusted', control.value + '%');
            panel.querySelector('output[for="default-styles-surface-transparency"]').textContent =
                control.value + '%';
            return;
        }
        */

    controlHandlers.get(control.id)?.(control, panel);
}

/* Read the initial values after the panel is attached to the document. */
function initializePrimaryColor(panel) {
    const control = panel.querySelector('#default-styles-primary-color');
    control.value = getCssColorAsHex(root, '--primary-color', control.value);
    control.style.setProperty('--color-control-value', control.value);
    setOutput(panel, control.id, control.value);
}

function initializeLengthControl(panel, controlId, property, fallback) {
    const control = panel.querySelector('#' + controlId);
    const value = getCssLengthInPixels(root, property, fallback);
    control.max = Math.max(Number(control.max), Math.ceil(value));
    control.value = value;
    setOutput(panel, control.id, value + 'px');
}

function initializeFontScale(panel, computedRoot) {
    const control = panel.querySelector('#default-styles-font-scale');
    const currentScale = Number.parseFloat(
        computedRoot.getPropertyValue('--root-font-scale')
    );
    control.value = Number.isFinite(currentScale) ? currentScale : 100;
    setOutput(panel, control.id, control.value + '%');
}

function initializeFontFamily(panel, computedRoot) {
    const control = panel.querySelector('#default-styles-font-family');
    const currentFontFamily = computedRoot.getPropertyValue('--font-family-base').trim();
    if (currentFontFamily && ![...control.options].some((option) =>
        option.value === currentFontFamily)) {
        const currentOption = new Option('Current app font', currentFontFamily);
        control.add(currentOption, 1);
        control.value = currentFontFamily;
    }
}

export function bindAppearanceControls(panel) {
    panel.addEventListener('input', (event) => updateAppearance(panel, event));
    panel.addEventListener('change', (event) => updateAppearance(panel, event));

    initializePrimaryColor(panel);
    initializeLengthControl(panel, 'default-styles-control-radius', '--radius-control', 4);
    initializeLengthControl(panel, 'default-styles-border-width', '--border-width-thin', 1);

    const computedRoot = getComputedStyle(root);
    /* Archived transparency cap initialization:
    const surfaceStrength = panel.querySelector('#default-styles-surface-transparency');
    updateSurfaceStrengthLimit = () => {
        const maximum = getMaximumSurfaceStrength();
        surfaceStrength.max = maximum;
        if (Number(surfaceStrength.value) > maximum) {
            surfaceStrength.value = maximum;
        }
        root.style.setProperty('--surface-strength-adjusted', surfaceStrength.value + '%');
        panel.querySelector('output[for="default-styles-surface-transparency"]').textContent =
            surfaceStrength.value + '%';
    };
    surfaceStrength.value = Number.parseFloat(
        computedRoot.getPropertyValue('--surface-strength-base')
    );
    // updateSurfaceStrengthLimit();
    */
    initializeFontScale(panel, computedRoot);
    initializeFontFamily(panel, computedRoot);
}