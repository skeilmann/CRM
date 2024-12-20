// General modal handling module
export const Modal = (() => {
    const openModal = (modalSelector) => {
        const modal = document.querySelector(modalSelector);
        if (modal) {
            modal.showModal();
        } else {
            console.error('Dialog element not found.');
        }
    };

    const closeModal = (modalSelector) => {
        const modal = document.querySelector(modalSelector);
        if (modal) modal.close();
    };

    const setupModalListeners = () => {
        document.addEventListener('click', (event) => {
            const action = event.target.dataset.action;
            if (action === 'cancel') {
                const modal = event.target.closest('dialog');
                if (modal) modal.close();
            }
        });
    };

    return { openModal, closeModal, setupModalListeners };
})();
Modal.setupModalListeners();
