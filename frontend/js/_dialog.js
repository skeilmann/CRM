// Generic function to initialize dialog behavior
function initializeDialog(dialogElement, openButton, closeButtons) {
  // Open dialog when the associated button is clicked
  openButton.addEventListener('click', () => {
    dialogElement.showModal();
  });

  // Close dialog on clicking specified close buttons or outside the dialog
  dialogElement.addEventListener('click', (event) => {
    if (event.target === dialogElement || event.target.closest(closeButtons)) {
      dialogElement.close();
    }
  });
}

// Dialog-specific initialization
document.addEventListener('DOMContentLoaded', () => {
  // Dialog for "New" functionality
  const dialogNew = document.querySelector('.modal--new');
  const showDialogNewBtn = document.querySelector('.btn--new');
  const dialogNewCloseButtons = '.modal_close, .btn_cancel';
  initializeDialog(dialogNew, showDialogNewBtn, dialogNewCloseButtons);

  // Dialog for "Edit" functionality
  const dialogEdit = document.querySelector('.modal--edit'); // Or `.modal--edit` if there's a specific class
  const showDialogEditBtn = document.querySelector('.edit_student_btn');
  const dialogEditCloseButtons = '.btn-primary';
  // initializeDialog(dialogEdit, showDialogEditBtn, dialogEditCloseButtons);

  // Dialog for "Delete" functionality
  const dialogDelete = document.querySelector('.modal--delete');
  const showDialogDeleteBtn = document.querySelector('.btn--delete');
  const dialogDeleteCloseButtons = '.btn_cancel, .modal_close';

  // initializeDialog(dialogDelete, showDialogDeleteBtn, dialogDeleteCloseButtons);

});
