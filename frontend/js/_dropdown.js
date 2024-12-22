import { createNewEl } from './dom.js'

const contactCategories = ['telephone', 'Facebook', 'Twitter', 'VK', 'Another Phone'];

// Function to create custom dropdown
export function createCustomDropdown() {
    return createNewEl({
        tag: 'div',
        params: { classList: 'dropdown' },
        elements: [
            {
                tag: 'div',
                params: {
                    classList: 'dropdown__selected',
                    textContent: 'Select contact type',
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
            },
        ],
        events: {
            click: (event) => {
                const dropdown = event.currentTarget;
                dropdown.classList.toggle('dropdown--open');
                if (event.target.matches('.dropdown__item')) {
                    const selected = dropdown.querySelector('.dropdown__selected');
                    selected.textContent = event.target.textContent;
                    selected.dataset.value = event.target.dataset.value;
                    dropdown.classList.remove('dropdown--open');
                }
            },
        },
    });
}