(function () {
    function getDialog(element, selector) {
        const dialog = selector ? document.querySelector(selector) : element.closest('dialog');
        if (!(dialog instanceof HTMLDialogElement)) {
            throw new Error('A dialog control must reference or be inside a <dialog> element.');
        }
        return dialog;
    }

    document.addEventListener('click', (event) => {
        if (!(event.target instanceof Element)) {
            return;
        }

        const openControl = event.target.closest('[data-dialog-open]');
        if (openControl) {
            getDialog(openControl, openControl.dataset.dialogOpen).showModal();
            return;
        }

        const closeControl = event.target.closest('[data-dialog-close]');
        if (closeControl) {
            getDialog(closeControl, closeControl.dataset.dialogClose).close();
        }
    });
})();
