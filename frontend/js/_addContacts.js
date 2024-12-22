import { createNewEl } from './dom.js';
import { createCustomDropdown } from './_dropdown.js';

const MAX_CONTACTS = 5;
const contactCategories = ['telephone', 'Facebook', 'Twitter', 'VK', 'Another Phone'];
const contactsContainer = document.querySelector('.contacts-container');
const addContactButton = contactsContainer.querySelector('.btn--contact');

// Function to add a new contact row
function addContactRow() {
    const contactGroup = createNewEl({
        tag: 'div',
        params: { classList: 'contact-group' },
        elements: [
            { tag: 'label', params: { textContent: 'Contact Type:' } },
            { elements: [createCustomDropdown()] },
            {
                tag: 'input',
                params: {
                    type: 'text',
                    placeholder: 'Enter contact',
                    classList: 'contact-input',
                },
            },
            {
                tag: 'button',
                params: {
                    classList: 'btn btn--delete',
                    type: 'button',
                },
                events: {
                    click: (e) => {
                        e.target.closest('.contact-group').remove();
                        if (contactsContainer.querySelectorAll('.contact-group').length < MAX_CONTACTS) {
                            addContactButton.disabled = false;
                        }
                    },
                },
            },
        ],
    });

    document.querySelector('.wrap').appendChild(contactGroup);
    if (contactsContainer.querySelectorAll('.contact-group').length >= MAX_CONTACTS) {
        addContactButton.disabled = true;
    }
}

// Attach event listener for the Add Contact button
addContactButton.addEventListener('click', addContactRow);

// Collect values on form submission
function collectFormData() {
    const client = {
        surname: document.querySelector('#surname').value,
        name: document.querySelector('#name').value,
        lastName: document.querySelector('#lastName').value,
        contacts: {},
    };

    const contactGroups = contactsContainer.querySelectorAll('.contact-group');
    contactGroups.forEach((group) => {
        const type = group.querySelector('.dropdown__selected').dataset.value;
        const value = group.querySelector('.contact-input').value;
        if (type && value) {
            client.contacts[type] = value;
        }
    });

    console.log(client); // Final client object
    return client;
}

// Example: Attach collectFormData to form submission
document.querySelector('.form--new').addEventListener('submit', (e) => {
    e.preventDefault();
    const client = collectFormData();
    console.log('Client Data:', client); // Send this to the server
});

