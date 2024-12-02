const dialogNew = document.querySelector('.modal--new');
const showDialogBtn = document.querySelector('.btn--new');
const closeButtons = dialog.querySelectorAll('.modal_close, .btn_cancel');
const dialogEdit = document.querySelector('dialog');
const showDialog = document.querySelector('.edit_student_btn');
const closeDialog = dialog.querySelector('.btn-primary');

showDialogBtn.addEventListener('click', () => {
    dialogNew.showModal();
});

dialogNew.addEventListener('click', (event) => {
    if (event.target === dialogNew || event.target.closest('.modal_close, .btn_cancel')) {
        dialogNew.close();
    }
});