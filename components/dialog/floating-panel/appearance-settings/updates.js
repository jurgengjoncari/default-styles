/**
 * Connect an app-owned update check and update action to the appearance panel.
 * The app must perform package updates through its own server or deployment flow.
 */
export function bindAppearanceUpdates(panel) {
    const notice = panel.querySelector('[data-default-styles-update]');
    const button = panel.querySelector('[data-default-styles-update-button]');
    let version;

    document.addEventListener('default-styles:update-available', (event) => {
        version = event.detail?.version;
        notice.hidden = false;
        button.textContent = version
            ? `Update available (${version})`
            : 'Update available';
    });

    document.addEventListener('default-styles:update-current', () => {
        version = undefined;
        notice.hidden = true;
    });

    button.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('default-styles:update-request', {
            detail: { version }
        }));
    });
}
