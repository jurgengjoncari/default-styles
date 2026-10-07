export function initializeFloatingPanels(root = document) {
    const panels = root instanceof Element && root.matches('[data-floating-panel]')
        ? [root, ...root.querySelectorAll('[data-floating-panel]')]
        : root.querySelectorAll('[data-floating-panel]');

    for (const panel of panels) {
        const trigger = panel.querySelector('[data-floating-panel-trigger]');
        const content = panel.querySelector('[data-floating-panel-content]');
        const dragHandles = [
            trigger,
            ...panel.querySelectorAll('[data-floating-panel-drag-handle]')
        ].filter(Boolean);

        if (!trigger || !content) {
            throw new Error('A floating panel requires a trigger and content element.');
        }

        function setOpen(isOpen, restoreFocus = false) {
            content.inert = !isOpen;
            content.setAttribute('aria-hidden', String(!isOpen));
            trigger.inert = isOpen;
            trigger.setAttribute('aria-hidden', String(isOpen));
            trigger.setAttribute('aria-expanded', String(isOpen));
            panel.classList.toggle('is-open', isOpen);

            if (isOpen) {
                const firstControl = content.querySelector(
                    'input:not(:disabled), button:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href]'
                );
                firstControl?.focus();
            } else if (restoreFocus) {
                trigger.focus();
            }
        }

        trigger.addEventListener('click', () => setOpen(content.inert));

        document.addEventListener('pointerdown', (event) => {
            if (!content.inert && !panel.contains(event.target)) {
                setOpen(false);
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !content.inert) {
                setOpen(false, true);
            }
        });

        let dragState = null;
        let suppressTriggerClick = false;

        function startDrag(event) {
            if (event.button !== 0) {
                return;
            }

            const bounds = panel.getBoundingClientRect();
            dragState = {
                pointerId: event.pointerId,
                startX: event.clientX,
                startY: event.clientY,
                left: bounds.left,
                top: bounds.top,
                moved: false
            };
            event.currentTarget.setPointerCapture(event.pointerId);
        }

        function movePanel(event) {
            if (!dragState || event.pointerId !== dragState.pointerId) {
                return;
            }

            const deltaX = event.clientX - dragState.startX;
            const deltaY = event.clientY - dragState.startY;
            if (!dragState.moved && Math.hypot(deltaX, deltaY) < 5) {
                return;
            }

            dragState.moved = true;
            const maxLeft = Math.max(0, window.innerWidth - panel.offsetWidth);
            const maxTop = Math.max(0, window.innerHeight - panel.offsetHeight);
            panel.style.left = `${Math.min(maxLeft, Math.max(0, dragState.left + deltaX))}px`;
            panel.style.top = `${Math.min(maxTop, Math.max(0, dragState.top + deltaY))}px`;
            panel.style.right = 'auto';
            panel.style.bottom = 'auto';
            event.preventDefault();
        }

        function endDrag(event) {
            if (!dragState || event.pointerId !== dragState.pointerId) {
                return;
            }

            suppressTriggerClick = dragState.moved && event.currentTarget === trigger;
            dragState = null;
        }

        for (const handle of dragHandles) {
            handle.addEventListener('pointerdown', startDrag);
            handle.addEventListener('pointermove', movePanel);
            handle.addEventListener('pointerup', endDrag);
            handle.addEventListener('pointercancel', endDrag);
        }

        trigger.addEventListener('click', (event) => {
            if (suppressTriggerClick) {
                suppressTriggerClick = false;
                event.preventDefault();
                event.stopPropagation();
            }
        }, true);

        function keepPanelInViewport() {
            if (!panel.style.left) {
                return;
            }

            const maxLeft = Math.max(0, window.innerWidth - panel.offsetWidth);
            const maxTop = Math.max(0, window.innerHeight - panel.offsetHeight);
            panel.style.left = `${Math.min(maxLeft, parseFloat(panel.style.left))}px`;
            panel.style.top = `${Math.min(maxTop, parseFloat(panel.style.top))}px`;
        }

        window.addEventListener('resize', keepPanelInViewport);
        new ResizeObserver(keepPanelInViewport).observe(panel);
    }
}

initializeFloatingPanels();
