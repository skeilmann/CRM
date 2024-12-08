// Event Delegation
const table = document.querySelector('.table');

table.addEventListener('click', (event) => {
  const editButton = event.target.closest('.btn--edit');
  const deleteButton = event.target.closest('.btn--delete');

  if (editButton) {
    document.querySelector('.modal--edit').showModal();
  }

  if (deleteButton) {
    document.querySelector('.modal--delete').showModal();
  }
});

// Generic Dialog Initialization
function initializeDialog(selector, closeSelectors) {
  const dialog = document.querySelector(selector);

  dialog.addEventListener('click', (event) => {
    const shouldClose = event.target === dialog ||
      event.target.closest(closeSelectors);

    if (shouldClose) {
      if (dialog.querySelector('form')) {
        dialog.querySelector('form').reset();
      }
      dialog.close();
    }
  });
}

// Dynamic Dialog Initialization
document.addEventListener('DOMContentLoaded', () => {
  // New dialog
  const showNewBtn = document.querySelector('.btn--new');
  if (showNewBtn) {
    showNewBtn.addEventListener('click', () => {
      document.querySelector('.modal--new').showModal();
    });
  }

  // Initialize dialogs
  initializeDialog('.modal--new', '.modal_close, .btn_cancel');
  initializeDialog('.modal--edit', '.modal_close, .btn_cancel');
  initializeDialog('.modal--delete', '.btn_cancel, .modal_close');
});