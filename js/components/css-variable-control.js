(function () {
    const controls = document.querySelectorAll('[data-css-variable]');

    function updateControl(control) {
        if (control.validity && !control.validity.valid) {
            return;
        }

        const property = control.dataset.cssVariable;
        if (!property) {
            return;
        }

        const value = control.value;
        if (value === '') {
            document.documentElement.style.removeProperty(property);
        } else {
            document.documentElement.style.setProperty(property, `${value}${control.dataset.cssUnit || ''}`);
        }

        if (control.id) {
            const output = [...document.querySelectorAll('output[for]')]
                .find((candidate) => candidate.getAttribute('for') === control.id);
            if (output) {
                const formattedValue = `${value}${control.dataset.outputUnit || control.dataset.cssUnit || ''}`;
                output.value = formattedValue;
                output.textContent = formattedValue;
            }
        }
    }

    for (const control of controls) {
        control.addEventListener('input', () => updateControl(control));
        control.addEventListener('change', () => updateControl(control));
        updateControl(control);
    }
})();
