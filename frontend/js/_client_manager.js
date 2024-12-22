import { Modal } from './modal.js';
import { deleteClientById, fetchClientById, addClients, updateClient } from './server_communication.js';
import { FormHandler } from './form_handler.js';
import { renderClientsTable } from './dom.js';

const clientIdDiv = document.querySelector('.modal--new .client-id');
const subtitle = document.querySelector('.modal--new .subtitle');
const saveBtn = document.querySelector('[data-action="save"]');
const hiddenIdDiv = document.querySelector('.modal--delete .modal_id-client');

export const ClientManager = (() => {
    let currentAction = null;
    let currentClientId = null;

    const handleAction = async (action, clientId = null) => {
        currentAction = action;
        currentClientId = clientId;

        if (action === 'new') {
            FormHandler.resetFields();
            subtitle.textContent = 'Add New Client'; // Change subtitle
            saveBtn.textContent = 'Add new'; // Change button text
            Modal.openModal('.modal--new');
            clientIdDiv.textContent = ''; // Clear ID from the header

        } else if (action === 'edit') {
            clientIdDiv.textContent = `ID: ${clientId}`; // Display ID in the header
            subtitle.textContent = 'Edit Client'; // Change subtitle
            saveBtn.textContent = 'Save Changes'; // Change button text
            const clientData = await fetchClientById(clientId);
            FormHandler.populateFields(clientData);
            Modal.openModal('.modal--new');

        } else if (action === 'delete') {
            hiddenIdDiv.textContent = clientId; // Store ID in hidden element
            Modal.openModal('.modal--delete');

        } else if (action === 'confirm-delete') {
            await deleteClientById(clientId);
            const clientsData = await initializeClients();
            renderClientsTable(clientsData);
        }
    };

    const saveClient = async (initializeClients) => {
        try {
            const clientData = FormHandler.collectFormData();
            if (!clientData) return; // If validation fails, form_handler returns null

            if (currentAction === 'new') {
                await addClients(clientData);
            } else if (currentAction === 'edit') {
                await updateClient(currentClientId, clientData);
            }

            const updatedClients = await initializeClients();
            renderClientsTable(updatedClients);
            Modal.closeModal('.modal--new');
        } catch (error) {
            console.error('Error saving client:', error);
        }
    };

    return { handleAction, saveClient };
})();
