import { fetchAllClients, addClients } from './server_communication.js';
import { renderClientsTable, createNewClient } from './dom.js';
import { sortArray } from './_sort.js';
let clientsData = [];

document.addEventListener('DOMContentLoaded', () => {
    // LOAD initial student data
    async function initializeClients() {
        clientsData = sortArray(await fetchAllClients(), 'id', true);
        renderClientsTable(clientsData);
        return clientsData;
    }
    initializeClients();

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

    // Add event listeners for table headers
    document.querySelectorAll('.table-header th').forEach(header => {
        header.addEventListener('click', (event) => {
            const headerElement = event.target.closest('th');
            const columnKey = headerElement.dataset.key; // The key to sort by
            const ascending = headerElement.dataset.ascending === 'true'; // Current direction
            const thIcon = headerElement.querySelector('.th-icon');
            const sortLabel = headerElement.querySelector('.th-data'); // Span to update (e.g., "A-Z" or "Z-A")

            // Reset other headers' icons and labels
            document.querySelectorAll('.th-icon').forEach(icon => {
                if (icon !== thIcon) icon.classList.remove('rotate', 'rotate-desc');
            });
            document.querySelectorAll('.sort-label').forEach(label => {
                if (label !== sortLabel) label.textContent = 'A-Z'; // Reset other labels
            });

            // Update the icon
            if (ascending) {
                thIcon.classList.add('rotate');
                thIcon.classList.remove('rotate-desc');
            } else {
                thIcon.classList.add('rotate-desc');
                thIcon.classList.remove('rotate');
            }

            // Update the sort label
            if (sortLabel) {
                sortLabel.textContent = ascending ? 'Z-A' : 'A-Z'; // Toggle the content
            }

            // Sort the array
            clientsData = sortArray(clientsData, columnKey, ascending);

            // Re-render the table with sorted data
            renderClientsTable(clientsData);

            // Toggle the sorting direction for the next click
            headerElement.dataset.ascending = !ascending;
        });
    });
});
