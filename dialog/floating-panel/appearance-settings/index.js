import { initializeFloatingPanels } from '../index.js';
import { bindAppearanceControls } from './controls.js';
import { createAppearancePanelElement } from './markup.js';
import { bindThemeControl } from './theme.js';

function createAppearancePanel() {
    const panel = createAppearancePanelElement();
    document.body.append(panel);
    bindThemeControl(panel);
    bindAppearanceControls(panel);
    initializeFloatingPanels(panel);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAppearancePanel, { once: true });
} else {
    createAppearancePanel();
}