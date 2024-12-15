import { fetchAllClients, addClients } from './server_communication.js';
import { renderClientsTable, createNewClient } from './dom.js';
import { sortArray, initializeSorting } from './_sort.js';
import { debounce, initializeSearch } from './_search.js';

let clientsData = [];

document.addEventListener('DOMContentLoaded', async () => {
    async function initializeClients() {
        clientsData = sortArray(await fetchAllClients(), 'id', true);
        renderClientsTable(clientsData);
        return clientsData;
    }
    await initializeClients();
    initializeSorting(clientsData, renderClientsTable);

    searchInput.addEventListener('input', debounce(() => {
        const searchQuery = searchInput.value.toLowerCase().trim();
        initializeSearch(clientsData, searchQuery);
        // updateSearchDropdown(filteredClients);
    }, 500));
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