import { validateForm } from './_validation.js';

export const FormHandler = (() => {
    const resetFields = () => {
        document.querySelector('#surname').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#lastName').value = '';
        const contactsContainer = document.querySelector('.contacts-container .wrap');
        contactsContainer.innerHTML = '';
    };

    const populateFields = (clientData) => {
        document.querySelector('#surname').value = clientData.surname || '';
        document.querySelector('#name').value = clientData.name || '';
        document.querySelector('#lastName').value = clientData.lastName || '';
        const contactsContainer = document.querySelector('.contacts-container .wrap');
        contactsContainer.innerHTML = '';
        clientData.contacts?.forEach(({ type, value }) => {
            addContactRow(type, value);
        });
    };

    const collectFormData = () => {
        const contacts = [];
        document.querySelectorAll('.contact-group').forEach(group => {
            const type = group.querySelector('.dropdown__selected').dataset.value;
            const value = group.querySelector('.contact-input').value.trim();
            if (type && value) contacts.push({ type, value });
        });

        return {
            surname: document.querySelector('#surname').value.trim(),
            name: document.querySelector('#name').value.trim(),
            lastName: document.querySelector('#lastName').value.trim(),
            contacts,
        };
    };

    const validate = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            console.error('Form validation failed.');
        }
        return isValid;
    };

    return { resetFields, populateFields, collectFormData, validate };
})();
