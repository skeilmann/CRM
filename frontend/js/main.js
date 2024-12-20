import { fetchAllClients, addClients, updateClient } from './server_communication.js';
import { renderClientsTable, createNewClient } from './dom.js';
import { sortArray, initializeSorting } from './_sort.js';
import { debounce, initializeSearch } from './_search.js';
import { validateForm } from './_validation.js';
import { Modal } from './modal.js'; // Import the reusable modal module
import { ClientManager } from './_client_manager.js'; // Import the client-specific module

let clientsData = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch and initialize clients
    async function initializeClients() {
        clientsData = sortArray(await fetchAllClients(), 'id', true);
        renderClientsTable(clientsData);
        return clientsData;
    }

    await initializeClients();

    // Initialize sorting functionality
    initializeSorting(clientsData, renderClientsTable);

    // Search functionality
    const searchInput = document.querySelector('#searchInput'); // Adjust the selector if needed
    searchInput.addEventListener(
        'input',
        debounce(() => {
            const searchQuery = searchInput.value.toLowerCase().trim();
            initializeSearch(clientsData, searchQuery);
        }, 500)
    );

    // Initialize dialog functionality
    Modal.setupModalListeners();

    // Add event listeners for "add new" and "edit" buttons
    document.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        const clientId = event.target.closest('tr')?.dataset.clientId;

        if (action === 'new') {
            ClientManager.handleAction('new');
        } else if (action === 'edit') {
            ClientManager.handleAction('edit', clientId);
        }
    });

    // Form submission for both adding and editing clients
    const newClientForm = document.querySelector('.form--new');
    newClientForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (validateForm()) {
            const clientData = ClientManager.createNewClient(); // Collect data from the form

            if (ClientManager.getCurrentAction() === 'new') {
                await addClients(clientData); // Add new client to the server
            } else if (ClientManager.getCurrentAction() === 'edit') {
                await updateClient(clientData); // Update client on the server
            }

            // Refresh the client list and table
            await initializeClients();
            renderClientsTable(clientsData);

            // Close the modal and reset the form
            Modal.closeModal('.modal--new');
            newClientForm.reset();
        }
    });
});
