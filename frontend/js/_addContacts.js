import { createNewEl } from './dom.js';

const contactCategories = ['telephone', 'Facebook', 'Twitter', 'VK', 'Another Phone'];

export function addContactRow(parent, type = 'telephone', value = '') {
    const contactGroup = createNewEl({
        tag: 'li',
        params: { classList: 'contact-group' },
        elements: [
            {
                tag: 'div',
                params: { classList: 'dropdown' },
                elements: [
                    {
                        tag: 'button',
                        params: {
                            classList: 'dropdown__selected',
                            textContent: type,
                            dataset: { value: type },
                        },
                        events: {
                            click: (event) => {
                                event.preventDefault();
                                const dropdown = event.currentTarget.nextElementSibling;
                                dropdown.classList.toggle('dropdown--open');
                            },
                        },
                    },
                    {
                        tag: 'ul',
                        params: { classList: 'dropdown__list' },
                        elements: contactCategories.map((category) => ({
                            tag: 'li',
                            params: {
                                classList: 'dropdown__item',
                                textContent: category,
                                dataset: { value: category },
                            },
                        })),
                        events: {
                            click: (event) => {
                                if (event.target.matches('.dropdown__item')) {
                                    const selected = event.currentTarget.previousElementSibling;
                                    selected.textContent = event.target.textContent;
                                    selected.dataset.value = event.target.dataset.value;
                                    event.currentTarget.classList.remove('dropdown--open');
                                }
                            },
                        },
                    },
                ],
            },
            {
                tag: 'input',
                params: {
                    type: 'text',
                    placeholder: 'Enter contact',
                    classList: 'contact-input',
                    value: value,
                },
            },
            {
                tag: 'button',
                params: {
                    classList: 'btn btn--delete',
                    type: 'button',
                    textContent: 'Remove',
                },
                events: {
                    click: (e) => {
                        e.target.closest('.contact-group').remove();
                    },
                },
            },
        ],
    });

    parent.appendChild(contactGroup);
}