import { createNewEl } from './dom.js'
import { createCustomDropdown } from './_addContacts.js'
import { Modal } from './modal.js'

// Project-specific logic
export const ClientManager = (() => {
    let currentAction = null; // Track current action: "new" or "edit"
    let currentClientId = null; // Track the ID of the client being edited

    const populateModalFields = (clientData) => {
        document.querySelector('#surname').value = clientData.surname || '';
        document.querySelector('#name').value = clientData.name || '';
        document.querySelector('#lastName').value = clientData.lastName || '';

        // Clear existing contacts
        const contactsContainer = document.querySelector('.contacts-container .wrap');
        contactsContainer.innerHTML = '';

        // Populate contacts if editing
        if (clientData.contacts) {
            clientData.contacts.forEach(({ type, value }) => {
                addContactRow(type, value);
            });
        }
    };

    const resetModalFields = () => {
        populateModalFields({}); // Clear all fields
        document.querySelector('.client-id').textContent = '';
    };

    const handleAction = (action, clientId = null) => {
        currentAction = action;
        currentClientId = clientId;

        if (action === 'new') {
            resetModalFields();
            document.querySelector('.subtitle').textContent = 'New Client';
            Modal.openModal('.modal--new');
        } else if (action === 'edit') {
            const clientData = getClientDataById(clientId); // Fetch client data from the table or server
            populateModalFields(clientData);
            document.querySelector('.client-id').textContent = `ID: ${clientId}`;
            document.querySelector('.subtitle').textContent = 'Edit Client';
            Modal.openModal('.modal--new');
        }
    };

    const saveClient = () => {
        const client = {
            id: currentAction === 'edit' ? currentClientId : Date.now(),
            surname: document.querySelector('#surname').value.trim(),
            name: document.querySelector('#name').value.trim(),
            lastName: document.querySelector('#lastName').value.trim(),
            contacts: collectContacts(),
        };

        if (currentAction === 'new') {
            addClientToTable(client);
            // NEW client form submission
            const newClientForm = document.querySelector('.form--new');
            newClientForm.addEventListener('submit', (event) => {
                event.preventDefault();

                if (validateForm()) {
                    const newClient = createNewClient(); // Collect data from the form
                    addClients(newClient);
                    initializeClients();
                    renderClientsTable(clientsData);
                    newClientForm.reset();
                    dialogNew.close();
                }
            })
        } else if (currentAction === 'edit') {
            updateClientInTable(client);
        }

        Modal.closeModal('.modal--new');
    };

    const addContactRow = (type = 'telephone', value = '') => {
        const contactsContainer = document.querySelector('.contacts-container .wrap');
        const contactGroup = createNewEl({
            tag: 'div',
            params: { classList: 'contact-group' },
            elements: [
                createCustomDropdown(type),
                {
                    tag: 'input',
                    params: {
                        classList: 'contact-input',
                        type: 'text',
                        value: value,
                        placeholder: 'Enter contact',
                    },
                },
                {
                    tag: 'button',
                    params: {
                        classList: 'btn btn--remove-contact',
                        type: 'button',
                        textContent: 'Remove',
                    },
                    events: {
                        click: (e) => e.target.closest('.contact-group').remove(),
                    },
                },
            ],
        });
        contactsContainer.appendChild(contactGroup);
    };

    const collectContacts = () => {
        const contacts = [];
        document.querySelectorAll('.contact-group').forEach((group) => {
            const type = group.querySelector('.dropdown__selected').dataset.value;
            const value = group.querySelector('.contact-input').value.trim();
            if (type && value) contacts.push({ type, value });
        });
        return contacts;
    };

    // Mock functions for client data manipulation
    const addClientToTable = (client) => {
        console.log('Adding new client:', client);
        // Add client to the table

    };

    const updateClientInTable = (client) => {
        console.log('Updating client:', client);
        // Update client in the table
    };

    const getClientDataById = (id) => {
        // Mock fetching client data by ID
        return {
            id,
            surname: 'Doe',
            name: 'John',
            lastName: 'Smith',
            contacts: [
                { type: 'telephone', value: '123456789' },
                { type: 'Facebook', value: 'john.doe' },
            ],
        };
    };

    return { handleAction, saveClient, addContactRow };
})();

// Attach events to buttons
document.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    if (action === 'new') {
        ClientManager.handleAction('new');
    } else if (action === 'edit') {
        const clientId = event.target.closest('tr')?.dataset.clientId;
        ClientManager.handleAction('edit', clientId);
    } else if (action === 'save') {
        ClientManager.saveClient();
    }
});
