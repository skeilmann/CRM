import { updateClient, fetchAllClients } from './server_communication.js';
import { initializeDialog } from './_dialog.js';
import { renderClientsTable } from './dom.js';

const nameForm = document.getElementById('Ename');
const surnameForm = document.getElementById('Esurname');
const lastNameForm = document.getElementById('ElastName');

export function initBtn(clientsData) {
    document.addEventListener('click', (event) => {
        const action = event.target.dataset.action;

        if (action) {
            // Skip row handling if action is 'save'
            if (action === 'save') {
                console.log('Save button clicked, no row lookup required.');
                return; // Stop further execution for 'save'
            }

            const row = event.target.closest('tr');
            if (!row) {
                console.error('Row not found for the clicked element. Ensure the structure is correct.');
                return;
            }

            const clientId = row.id;
            console.log('Row ID:', clientId);

            switch (action) {
                case 'edit':
                    handleEdit(clientId, clientsData);
                    break;
                case 'delete':
                    handleDelete(clientId, clientsData);
                    break;
                default:
                    console.warn('Unknown action:', action);
            }
        }
    });
}


function handleEdit(clientId, clientsData) {
    console.log('Edit button clicked for client ID:', clientId);

    // Populate modal with client data
    const client = clientsData.find(c => c.id === clientId);
    if (!client) {
        console.error('Client not found');
        return;
    }

    nameForm.value = client.name || '';
    surnameForm.value = client.surname || '';
    lastNameForm.value = client.lastName || '';

    // Open the modal
    initializeDialog('.modal--edit', '.modal_close, .btn_cancel');

    // Add event listener for Save button
    const saveButton = document.querySelector('[data-action="save"]');
    saveButton.onclick = (e) => {
        e.preventDefault();
        saveChanges(clientId, clientsData)
    };
}

function handleDelete(clientId) {
    console.log('Delete button clicked for client ID:', clientId);

    // Open delete confirmation modal
    initializeDialog('.modal--delete', '.btn_cancel, .modal_close');

    // Add logic for delete action (if needed)
}

export async function saveChanges(clientId, clientsData) {
    const clientIndex = clientsData.findIndex(c => c.id === clientId);
    if (clientIndex === -1) {
        console.error('Client not found in local data');
        return;
    }


    // Gather updated data from the form
    const updatedClient = {
        name: nameForm.value,
        surname: surnameForm.value,
        lastName: lastNameForm.value,
        contacts: [],
    };

    try {
        await updateClient(clientId, updatedClient);
        clientsData[clientIndex] = updatedClient;
        renderClientsTable(clientsData);
        document.querySelector('.modal--edit').style.display = 'none';
        console.log('Client updated successfully');
    } catch (error) {
        console.error('Error updating client:', error);
        alert('An error occurred while saving the changes. Check the console for details.');
    }
}
