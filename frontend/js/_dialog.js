// Utility function to show dialogs
function showDialog(dialog) {
  const dialogElement = typeof dialog === 'string' ? document.querySelector(dialog) : dialog;
  if (dialogElement) {
    dialogElement.showModal();
  } else {
    console.error('Dialog element not found.');
  }
}

// Generic dialog initialization
export function initializeDialog(selector, closeSelectors) {
  const dialog = document.querySelector(selector);
  if (!dialog) return;

  const resetForm = () => {
    const form = dialog.querySelector('form');
    if (form) form.reset();
  };

  dialog.addEventListener('click', (event) => {
    const shouldClose = event.target === dialog || event.target.closest(closeSelectors);
    if (shouldClose) {
      resetForm();
      dialog.close();
    }
  });
}

// "New" button functionality
const showNewBtn = document.querySelector('.btn--new');
if (showNewBtn) {
  showNewBtn.addEventListener('click', () => showDialog('.modal--new'));
}

//table event listeners
export function initializeTable() {
  const table = document.querySelector('.table');

  if (!table) return;

  table.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (button) {
      const action = button.dataset.action; // e.g., 'edit', 'delete'
      showDialog(`.modal--${action}`);
    }
  });
}