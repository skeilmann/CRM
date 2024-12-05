import { fetchAllClients, addClients } from './server_communication.js';
import { renderClientsTable } from './dom.js';
import { createNewClient } from './dom.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize dialogs
    const dialogNew = document.querySelector('.modal--new');
    // const showDialogNewBtn = document.querySelector('.btn--new');
    // const dialogNewCloseButtons = '.modal_close, .btn_cancel';
    // initializeDialog(dialogNew, showDialogNewBtn, dialogNewCloseButtons);

    // Load initial student data
    fetchAllClients()
        .then((students) => {
            renderClientsTable(students);
        })
        .catch((error) => {
            console.error('Error fetching initial students:', error);
        });

    // Handle new client form submission
    const newClientForm = document.querySelector('.form--new');
    newClientForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // if (validateForm()) {
        const newClient = createNewClient(); // Collect data from the form
        addClients(newClient)
            .then(() => fetchAllClients())
            .then((students) => {
                renderClientsTable(students);
                newClientForm.reset();
                dialogNew.close();
            })
            .catch((error) => {
                console.error('Error adding client:', error);
                alert('An error occurred. Please try again.');
            });
        // } else {
        //     alert('Please fill out all required fields correctly.');
        // }
    });
});
