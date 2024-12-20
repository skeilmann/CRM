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

function highlightAndScrollToRow(clientId, dropdownItem = null) {
    // Find the row with the matching ID
    const activeItem = searchResult.querySelector(`.${CLASS_ACTIVE}`);
    if (activeItem) activeItem.classList.remove(CLASS_ACTIVE);

    // Add active class to the current dropdown item
    if (dropdownItem) {
        dropdownItem.classList.add(CLASS_ACTIVE);

        dropdownItem.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
        });
    }
    const row = document.getElementById(clientId);
    if (!row) return;

    // Scroll and highlight the row
    row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    row.classList.add(CLASS_HIGHLIGHT);

    setTimeout(() => row.classList.remove(CLASS_HIGHLIGHT), 1000);
}

// Search Initialization
export function initializeSearch(data, searchQuery) {
    const sanitizedQuery = searchQuery.trim().toLowerCase();
    const filteredClients = data.filter(client =>
        client.fullName.toLowerCase().includes(sanitizedQuery) ||
        String(client.id).includes(sanitizedQuery)
    );
    updateSearchDropdown(filteredClients, searchQuery);
    showBackdrop();
}

function updateSearchDropdown(filteredClients, searchQuery) {
    searchResult.innerHTML = '';

    // Handle empty search or no results
    if (!filteredClients || filteredClients.length === 0 || searchQuery.trim() === '') {
        createNewEl({
            tag: 'li',
            params: {
                classList: [CLASS_SEARCH_RESULT_ITEM, 'no-results'],
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
            classList: [CLASS_SEARCH_RESULT_ITEM],
            textContent: `${client.fullName} (ID: ${client.id})`,
            dataset: { clientId: client.id },
            tabindex: '1',
        },
        events: {
            click: () => selectClient(client.id),
        },
        parent: searchResult,
    }));
    searchResult.style.display = 'block';

    const items = searchResult.querySelectorAll(`.${CLASS_SEARCH_RESULT_ITEM}`);
    highlightAndScrollToRow(items[0].dataset.clientId, items[0]);
}

// Client Selection Logic
function selectClient(clientId = null) {
    highlightAndScrollToRow(clientId);
    searchResult.innerHTML = '';
    searchResult.style.display = 'none';
    searchInput.value = '';
}

// Keyboard Navigation
function handleKeyboardNavigation(event) {
    const items = searchResult.querySelectorAll(`.${CLASS_SEARCH_RESULT_ITEM}`);
    if (items.length === 0) return;

    const activeItem = searchResult.querySelector(`.${CLASS_ACTIVE}`);
    let currentIndex = Array.from(items).indexOf(activeItem);

    if (event.key === 'ArrowDown') {
        currentIndex = (currentIndex + 1) % items.length;
        highlightAndScrollToRow(items[currentIndex].dataset.clientId, items[currentIndex]);
        event.preventDefault();
    } else if (event.key === 'ArrowUp') {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        highlightAndScrollToRow(items[currentIndex].dataset.clientId, items[currentIndex]);
        event.preventDefault();
    } else if (event.key === 'Enter' && activeItem) {
        selectClient(activeItem.dataset.clientId);
    }
}

// Event Listeners
searchInput.addEventListener('keydown', handleKeyboardNavigation);

let searchWrap = document.querySelector('.header_search-wrap');
// Hide dropdown and clear input when clicking outside
searchWrap.addEventListener('click', (event) => {
    if (event.target === searchInput || event.target.closest('.search-result')) {
        // Handle clicks within the search wrap
    } else {
        hideBackdrop();
        selectClient();
        searchResult.innerHTML = '';
        searchInput.value = '';
    }
});

function showBackdrop() {
    document.querySelector('.search-backdrop').style.display = 'block';
}

function hideBackdrop() {
    document.querySelector('.search-backdrop').style.display = 'none';
}