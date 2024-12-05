const client = [
    {
        id: '1234567890',
        createdAt: '',
        updatedAt: '',
        name: 'John',
        surname: 'Doe',
        lastName: 'Michael',
        contacts: [
            {
                type: 'Телефон',
                value: '+71234567890'
            },
            {
                type: 'Email',
                value: 'abc@xyz.com'
            },
            {
                type: 'Facebook',
                value: 'https://facebook.com/vasiliy-pupkin-the-best'
            }
        ]
    },
    {
        id: 2,
        name: 'Jane',
        surname: 'Smith',
        patronymic: 'Emily',
        createdAt: {
            date: '12.12.2021',
            time: '16:15'
        },
        editedAt: {
            date: '12.12.2021',
            time: '16:15'
        },
        contacts: {
            Phone: '+9876543210',
            Email: 'janesmith@example.com'
        }
    }
];
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
    arr.forEach((Client) => {
        createClientItem(Client);
    });
}

// DOM -- general function to create elements
function createNewEl(options = {}) {
    const el = document.createElement(options.tag || 'div');

    if (options.params) {
        for (const [key, value] of Object.entries(options.params)) {
            if (key === 'classList') {
                for (const newClass of value) {
                    el.classList.add(newClass);
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
                params: {
                    textContent: formatDate(ClientObj.createdAt, 'date')
                },
                elements: [
                    {
                        params: {
                            textContent: formatDate(ClientObj.createdAt, 'time'),
                            classList: 'text-muted'
                        }
                    }]
            },
            {
                tag: 'td',
                params: {
                    textContent: formatDate(ClientObj.updatedAt, 'date')
                },
                elements: [
                    {
                        params: {
                            textContent: formatDate(ClientObj.updatedAt, 'time'),
                            classList: 'text-muted'
                        }
                    }]
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
                    textContent: ClientObj.contact
                },
                elements: [
                    {
                        tag: 'button',
                        params: {
                            textContent: 'Delete',
                            classList: 'btn,btn_edit'
                        }
                    },
                    {
                        tag: 'button',
                        params: {
                            textContent: 'Edit',
                            classList: 'btn,btn_delete'
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

// VALIDATION LOGIC - validate entire form
function validateForm() {
    let isValid = true;

    // Loop throo form field and validate each
    const formInputs = newClientForm.querySelectorAll('input');
    formInputs.forEach(input => {
        const fieldName = input.getAttribute('id');
        const value = input.value;

        // console.log(ClientName);
        // console.log(fieldName, value);

        if (!validateField(fieldName, value)) {
            isValid = false;
        } else {
            input.classList.remove('is-valid', 'is-invalid');
        }
    });

    return isValid;
}
