import { fetchAllClients } from './server_communication.js';
import { renderClientsTable } from './dom.js';
import { sortArray, initializeSorting } from './_sort.js';
import { debounce, initializeSearch } from './_search.js';
import { Modal } from './modal.js';
import { ClientManager } from './_client_manager.js';
import { addContactRow } from './_addContacts.js';

let clientsData = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize clients and table
    async function initializeClients() {
        clientsData = sortArray(await fetchAllClients(), 'id', true);
        return clientsData;
    }
    
    await initializeClients();
    renderClientsTable(clientsData);
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
    
        if (['new', 'edit', 'delete', 'confirm-delete'].includes(action)) {
            ClientManager.handleAction(action, clientId);
        } else if (action === 'add-contact') {
            const contactContainer = document.querySelector('.contact-list');
            if (contactContainer.children.length < 3) {
                addContactRow(contactContainer);
            }
        }
    });

    // Form submission for both adding and editing clients
    const newClientForm = document.querySelector('.form--new');
    newClientForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await ClientManager.saveClient(initializeClients);
    });
});
