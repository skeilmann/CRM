import { createNewEl } from './dom.js'

const CLASS_ACTIVE = 'active';
const CLASS_HIGHLIGHT = 'highlight';
const CLASS_SEARCH_RESULT_ITEM = 'search-result-item';

export function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}


export function initializeSearch(data, searchQuery) {
    const filteredClients = data.filter(client => {
        return (
            client.fullName.toLowerCase().includes(searchQuery) ||
            String(client.id).includes(searchQuery)
        );
    });

    // Update dropdown with filtered results
    updateSearchDropdown(filteredClients, searchQuery);
}

export function updateSearchDropdown(filteredClients, searchQuery) {
    searchResult.innerHTML = '';

    // Handle empty search or no results
    if (!filteredClients || filteredClients.length === 0 || searchQuery.trim() === '') {
        createNewEl({
            tag: 'li',
            params: {
                classList: ['search-result-item', 'no-results'],
                textContent: searchQuery.trim() === ''
                    ? 'Please enter a search term'
                    : 'No client was found',
            },
            parent: searchResult,
        });
        searchResult.style.display = 'block';
        return;
    }

    // Create result items for matching clients
    filteredClients.forEach(client => createNewEl({
        tag: 'li',
        params: {
            classList: ['search-result-item'],
            textContent: `${client.fullName} (ID: ${client.id})`,
            dataset: { clientId: client.id },
            tabindex: '1',
        },
        events: {
            click: () => selectClient(client.id),
        },
        parent: searchResult,
    }));

    searchResult.style.display = filteredClients.length > 0 ? 'block' : 'none';
}


function highlightAndScrollToRow(clientId, dropdownItem = null) {
    // Find the row with the matching ID
    const activeItem = searchResult.querySelector(`${CLASS_ACTIVE}`)
    const row = document.getElementById(clientId);
    if (!row) return;

    // Scroll to the row
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Add highlight class
    row.classList.add('highlight');


    // Remove highlight after 1 seconds
    setTimeout(() => {
        row.classList.remove('highlight');
    }, 1000);
}

let currentIndex = -1;

// Shared logic for selecting a client
function selectClient(clientId) {
    highlightAndScrollToRow(clientId); // Highlight and scroll to the row
    searchResult.innerHTML = ''; // Hide the dropdown
    searchInput.value = ''; // Clear the search input (optional)
}

// Handle keyboard navigation and Enter key press
searchInput.addEventListener('keydown', (event) => {
    const activeItem = searchResult.querySelector('.search-result-item.active');

    if (event.key === 'ArrowDown') {
        // Navigate to the next item
        if (activeItem) {
            const nextItem = activeItem.nextElementSibling;
            if (nextItem) {
                highlightAndScrollToRow(nextItem.dataset.clientId);
                activeItem.classList.remove('active');
                nextItem.classList.add('active');
            }
        } else {
            // Activate the first item if none is active
            const firstItem = searchResult.querySelector('.search-result-item');
            if (firstItem) {
                highlightAndScrollToRow(firstItem.dataset.clientId);
                firstItem.classList.add('active');
            }
        }
        event.preventDefault(); // Prevent cursor movement in the input
    } else if (event.key === 'ArrowUp') {
        // Navigate to the previous item
        if (activeItem) {
            const prevItem = activeItem.previousElementSibling;
            if (prevItem) {
                highlightAndScrollToRow(prevItem.dataset.clientId);
                activeItem.classList.remove('active');
                prevItem.classList.add('active');
            }
        }
        event.preventDefault();
    } else if (event.key === 'Enter' && activeItem) {
        // Select the active item on Enter key press
        const clientId = activeItem.dataset.clientId;
        if (clientId) {
            selectClient(clientId); // Use shared logic
        }
    }
});


