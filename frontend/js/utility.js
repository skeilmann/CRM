const dialog = document.querySelector('.modal--new');
const showDialogBtn = document.querySelector('.btn--new');
const closeButtons = dialog.querySelectorAll('.modal_close, .btn_cancel');

showDialogBtn.addEventListener('click', () => {
    dialog.showModal();
});

dialog.addEventListener('click', (event) => {
    if (event.target === dialog || event.target.closest('.modal_close, .btn_cancel')) {
        dialog.close();
    }
});