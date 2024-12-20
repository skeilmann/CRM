const client = [];
const newClientForm = document.querySelector('.form--new');
let nameForm = document.getElementById('name');
let surnameForm = document.getElementById('surname');
let lastNameform = document.getElementById('lastName');
let table = document.getElementById('table_content');

// PREPARATION -- capitalize first letter
function modifyItem(str) {
    let lowValue = str.toLowerCase();
    let firstL = str.charAt(0).toUpperCase();
    let value = firstL + lowValue.slice(1);
    return value;
}

// PREPARATION - format date
function formatDate(clientDate, type) {
    const date = new Date(clientDate);


    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    if (type === 'date') {
        const day = pad(date.getDate());
        const month = pad(date.getMonth());
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    } else if (type === 'time') {
        const hours = pad(date.getHours());
        const min = pad(date.getMinutes());

        return `${hours}:${min}`;
    } else {
        return 'GEORGE - invalid return specified.';
    }
}

// FUNCTION STARTER -- clear and render table
export function renderClientsTable(arr) {
    let tableContent = document.querySelector('.table_body');
    tableContent.innerHTML = '';
    arr.forEach((client) => {
        createClientItem(client);
    });
}

// DOM -- general function to create elements
export function createNewEl(options = {}) {
    const el = document.createElement(options.tag || 'div');

    if (options.params) {
        for (const [key, value] of Object.entries(options.params)) {
            if (key === 'classList') {
                if (Array.isArray(value)) {
                    el.classList.add(...value); // Spread array of class names
                } else {
                    el.classList.add(...value.split(' ')); // Split string by spaces
                }
            } else if (key === 'dataset') {
                for (const [dataKey, dataValue] of Object.entries(value)) {
                    el.dataset[dataKey] = dataValue; // Set individual dataset properties
                }
            } else {
                el[key] = value;
            }
        }
    }

    if (options.elements) {
        for (const newElOptions of options.elements) {
            const newEl = createNewEl(newElOptions);
            el.appendChild(newEl);
        }
    }

    if (options.parent) {
        options.parent.appendChild(el);
    }

    if (options.events) {
        for (const [eventType, eventHandler] of Object.entries(options.events)) {
            el.addEventListener(eventType, eventHandler);
        }
    }

    return el;
}

// DOM -- create clients
function createClientItem(ClientObj) {
    let row = createNewEl({
        tag: 'tr',
        params: {
            classList: 'table_row',
            id: ClientObj.id
        },
        elements: [
            {
                tag: 'td',
                params: {
                    textContent: ClientObj.id
                }
            },
            {
                tag: 'td',
                params: {
                    textContent: ClientObj.fullName
                }
            },
            {
                tag: 'td',
                elements: [
                    {
                        params: {
                            classList: 'td-wrap'
                        },
                        elements: [
                            {
                                params: {
                                    textContent: formatDate(ClientObj.createdAt, 'date'),
                                },
                            },
                            {
                                params: {
                                    textContent: formatDate(ClientObj.createdAt, 'time'),
                                    classList: 'text-muted'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'td',
                elements: [
                    {
                        params: {
                            classList: 'td-wrap'
                        },
                        elements: [
                            {
                                params: {
                                    textContent: formatDate(ClientObj.updatedAt, 'date'),

                                }
                            },
                            {
                                params: {
                                    textContent: formatDate(ClientObj.updatedAt, 'time'),
                                    classList: 'text-muted'
                                }
                            }
                        ]

                    }
                ]
            },
            {
                tag: 'td',
                params: {
                    textContent: ClientObj.contact
                }
            },
            {
                tag: 'td',
                params: {
                    textContent: ClientObj.contact,
                    classList: 'td-wrap'
                },
                elements: [
                    {
                        tag: 'button',
                        params: {
                            textContent: 'Edit',
                            classList: 'btn btn--edit',
                            dataset: {
                                action: 'edit'
                            }
                        }
                    },
                    {
                        tag: 'button',
                        params: {
                            textContent: 'Delete',
                            classList: 'btn btn--delete',
                            dataset: {
                                action: 'delete'
                            }
                        }
                    }

                ]
            }
        ],
        parent: table
    })
}

// ARRAY --  create a Client object
export function createNewClient() {
    const newClient = {
        name: modifyItem(nameForm.value),
        surname: modifyItem(surnameForm.value),
        lastName: modifyItem(lastNameform.value),
        contacts: [],
    };

    return newClient
}