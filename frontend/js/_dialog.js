// Utility function to show dialogs
function showDialog(dialogElement) {
  if (dialogElement) {
    dialogElement.showModal();
  } else {
    console.error('Dialog element not found.');
  }
}

// Event Delegation
const table = document.querySelector('.table');

table.addEventListener('click', (event) => {
  const editButton = event.target.closest('.btn--edit');
  const deleteButton = event.target.closest('.btn--delete');

  if (editButton) {
    showDialog(document.querySelector('.modal--edit'));
  }

  if (deleteButton) {
    showDialog(document.querySelector('.modal--delete'));
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
      showDialog(document.querySelector('.modal--new'));
    });
  }

  // Initialize dialogs
  initializeDialog('.modal--new', '.modal_close, .btn_cancel');
  initializeDialog('.modal--edit', '.modal_close, .btn_cancel');
  initializeDialog('.modal--delete', '.btn_cancel, .modal_close');
});