import { fetchAllClients } from './server_communication.js';
import { renderClientsTable } from './dom.js';
import { sortArray, initializeSorting } from './_sort.js';
import { debounce, initializeSearch } from './_search.js';
import { validateForm } from './_validation.js';
import { Modal } from './modal.js';
import { ClientManager } from './_client_manager.js';

let clientsData = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize clients and table
    async function initializeClients() {
        clientsData = sortArray(await fetchAllClients(), 'id', true);
        renderClientsTable(clientsData);
        return clientsData;
    }

    await initializeClients();
    initializeSorting(clientsData, renderClientsTable);

    // Initialize modal listeners
    Modal.setupModalListeners();

    // Search functionality
    const searchInput = document.querySelector('#searchInput');
    searchInput.addEventListener(
        'input',
        debounce(() => initializeSearch(clientsData, searchInput.value), 500)
    );

    document.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        const clientId = event.target.closest('tr')?.id;
    
        if (['new', 'edit', 'delete'].includes(action)) {
            ClientManager.handleAction(action, clientId);
        } else if (action === 'save') {
            ClientManager.saveClient(clientsData, initializeClients); // Pass required dependencies
        } else if (action === 'confirm-delete') {
            // Retrieve client ID from the hidden div and confirm delete
            const hiddenIdDiv = document.querySelector('.modal--delete .modal_id-client');
            const clientIdToDelete = hiddenIdDiv.textContent;
            ClientManager.handleAction('confirm-delete', clientIdToDelete);
        }
    });
    
});
