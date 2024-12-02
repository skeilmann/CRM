document.addEventListener('DOMContentLoaded', function () {
  const dialog = document.querySelector('dialog');
  const showDialog = document.querySelector('.edit_student_btn');
  const closeDialog = dialog.querySelector('.btn-primary');

  showDialog.addEventListener('click', () => {
    dialog.showModal()

  })

  closeDialog.addEventListener('click', () => {
    dialog.close()
  })
}
)

