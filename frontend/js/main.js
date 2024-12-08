import { fetchAllClients, addClients } from './server_communication.js';
import { renderClientsTable, createNewClient } from './dom.js';
import { sortArray, initializeSorting } from './_sort.js';

let clientsData = [];

document.addEventListener('DOMContentLoaded', async () => {
    // LOAD initial student data
    async function initializeClients() {
        clientsData = sortArray(await fetchAllClients(), 'id', true);
        renderClientsTable(clientsData);
        return clientsData;
    }
    await initializeClients();
    initializeSorting(clientsData, renderClientsTable);
});

// NEW client form submission
const newClientForm = document.querySelector('.form--new');
newClientForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // if (validateForm()) {
    const newClient = createNewClient(); // Collect data from the form
    addClients(newClient);
    initializeClients();
    renderClientsTable(clientsData);
    newClientForm.reset();
    dialogNew.close();
})
// } else {
//     alert('Please fill out all required fields correctly.');
// }