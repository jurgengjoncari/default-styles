import tokens from '../../../../css/tokens/tokens.json' with { type: 'json' };
import { getAccessibleAccent, getContrastingTextColor } from '../../../../js/utilities/color/contrast.js';
import { mix } from '../../../../js/utilities/color/mix.js';
import {
    getCssColorAsHex,
    getCssLengthInPixels
} from '../../../../js/utilities/style-values.js';

const root = document.documentElement;
const radiusTokens = Object.fromEntries(Object.entries(tokens.radius).map(([role, options]) => [
    role,
    Object.entries(options).map(([label, value]) => ({ label, value }))
]));

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
    const surface = parseCssColor(styles.getPropertyValue('--color-surface'));
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

function getRadiusTokenSize(token, rootFontSize) {
    const value = Number.parseFloat(token.value);
    return token.value.endsWith('em') || token.value.endsWith('rem')
        ? value * rootFontSize
        : value;
}

function updateRadius(control, panel, role) {
    const token = radiusTokens[role][Number(control.value)];
    if (!token) {
        return;
    }

    root.style.setProperty(`--radius-${role}`, `var(--radius-${role}-${token.label})`);
    control.setAttribute('aria-valuetext', token.label);
    setOutput(panel, control.id, token.label);
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
    ['default-styles-control-radius', (control, panel) => updateRadius(control, panel, 'control')],
    ['default-styles-surface-radius', (control, panel) => updateRadius(control, panel, 'surface')],
    ['default-styles-surface-transparency', (control, panel) =>
        updateCssVariable(control, panel, '--color-surface-strength-control', '%')],
    ['default-styles-font-scale', (control, panel) =>
        updateCssVariable(control, panel, '--root-font-scale', '%')],
    ['default-styles-text-spacing', (control) =>
        root.toggleAttribute('data-default-styles-text-spacing', control.checked)],
    ['default-styles-reduced-motion', (control) =>
        root.toggleAttribute('data-default-styles-reduced-motion', control.checked)],
    ['default-styles-high-contrast', (control) => {
        if (control.checked) {
            root.setAttribute('data-default-styles-contrast', 'more');
        } else {
            root.removeAttribute('data-default-styles-contrast');
        }
    }],
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

function initializeRadiusControl(panel) {
    const rootFontSize = Number.parseFloat(getComputedStyle(root).fontSize);
    ['control', 'surface'].forEach((role) => {
        const control = panel.querySelector(`#default-styles-${role}-radius`);
        const options = radiusTokens[role];
        const property = `--radius-${role}`;
        control.min = 0;
        control.max = options.length - 1;
        control.step = 1;

        const currentValue = getCssLengthInPixels(root, property,
            getRadiusTokenSize(options[0], rootFontSize));
        const selectedIndex = options.reduce((closestIndex, token, index) =>
            Math.abs(getRadiusTokenSize(token, rootFontSize) - currentValue)
                < Math.abs(getRadiusTokenSize(options[closestIndex], rootFontSize) - currentValue)
                ? index
                : closestIndex, 0);
        control.value = selectedIndex;

        const selectedToken = options[selectedIndex];
        control.setAttribute('aria-valuetext', selectedToken.label);
        setOutput(panel, control.id, selectedToken.label);
    });
}

function initializeSurfaceStrength(panel, computedRoot) {
    const control = panel.querySelector('#default-styles-surface-transparency');
    const strength = Number.parseFloat(
        computedRoot.getPropertyValue('--color-surface-strength')
    );
    control.value = Number.isFinite(strength) ? strength : 10;
    setOutput(panel, control.id, control.value + '%');
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

function initializeTestingControls(panel) {
    panel.querySelector('#default-styles-text-spacing').checked =
        root.hasAttribute('data-default-styles-text-spacing');
    panel.querySelector('#default-styles-reduced-motion').checked =
        root.hasAttribute('data-default-styles-reduced-motion');
    panel.querySelector('#default-styles-high-contrast').checked =
        root.getAttribute('data-default-styles-contrast') === 'more';
}

export function bindAppearanceControls(panel) {
    panel.addEventListener('input', (event) => updateAppearance(panel, event));
    panel.addEventListener('change', (event) => updateAppearance(panel, event));

    initializePrimaryColor(panel);
    initializeRadiusControl(panel);

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
    initializeTestingControls(panel);
}
