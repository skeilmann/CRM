import { renderClientsTable } from './dom.js';

// Sort the array by a given key and direction
export function sortArray(array, key, ascending = true) {
    return array.slice().sort((a, b) => {
        const valueA = typeof a[key] === 'string' ? a[key].toLowerCase() : a[key];
        const valueB = typeof b[key] === 'string' ? b[key].toLowerCase() : b[key];

        if (valueA < valueB) return ascending ? -1 : 1;
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0;
    });
}

// Initialize sorting logic for table headers
export function initializeSorting(clientsData) {
    let lastSortedColumn = 'id'; // Default sorted column
    let lastSortDirection = true; // Default sort direction (ascending)

    document.querySelectorAll('.table-header th').forEach(header => {
        header.addEventListener('click', (event) => {
            const headerElement = event.target.closest('th');
            const columnKey = headerElement.dataset.key; // The key to sort by
            let ascending = headerElement.dataset.ascending === 'true';
            const thIcon = headerElement.querySelector('.th-icon');
            const sortLabel = headerElement.querySelector('.sort-label');

            // Reset other headers' states
            document.querySelectorAll('.th-icon').forEach(icon => {
                if (icon !== thIcon) icon.classList.remove('rotate');

            });
            document.querySelectorAll('.sort-label').forEach(label => {
                if (label !== sortLabel) label.textContent = 'A-Z';
            });

            // Toggle sorting only if it's not the initial sorted state
            if (lastSortedColumn === columnKey && lastSortDirection === ascending) {
                ascending = !ascending;
            }

            ascending ? thIcon.classList.add('rotate') : thIcon.classList.remove('rotate');

            // Update the sort label
            if (sortLabel) {
                sortLabel.textContent = ascending ? 'Z-A' : 'A-Z';
            }

            // Sort data and render
            clientsData = sortArray(clientsData, columnKey, ascending);
            renderClientsTable(clientsData);

            // Update tracking variables
            lastSortedColumn = columnKey;
            lastSortDirection = ascending;

            // Save the new direction to the header element
            headerElement.dataset.ascending = ascending;
        });
    });
    return clientsData;
}
