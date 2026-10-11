export function createAppearancePanelElement() {
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
            <!-- Archived transparency control:
            <div class="settings-panel__item">
                <label class="form-field" for="default-styles-surface-transparency">
                    <span class="form-field__label">Surface strength</span>
                    <input id="default-styles-surface-transparency" type="range"
                        min="0" max="20" step="1" value="10">
                    <output class="form-field__output" for="default-styles-surface-transparency">10%</output>
                </label>
            </div>
            -->
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

    return panel;
}