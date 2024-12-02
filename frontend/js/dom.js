document.addEventListener('DOMContentLoaded', function () {
    const students = [
        {
            id: '1234567890',
            createdAt: '',
            updatedAt: '',
            name: 'John',
            surname: 'Doe',
            lastName: 'Michael',
            contacts: [
                {
                    type: '',
                    value: ''
                },
                {
                    type: '',
                    value: ''
                },
                {
                    type: '',
                    value: ''
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
    const newStudentForm = document.querySelector('.form--new');
    let studentName = document.getElementById('name');
    let studentSurname = document.getElementById('surname');
    let studentPat = document.getElementById('patronymic');
    let table = document.getElementById('table_content');

    // PREPARATION -- capitalize first letter
    function modifyItem(str) {
        let lowValue = str.toLowerCase();
        let firstL = str.charAt(0).toUpperCase();
        value = firstL + lowValue.slice(1);
        console.log(str);
        return str;
    }

    // PREPARATION -- generate ID
    function generateUniqueId() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // PREPARATION - format date
    function getFormattedDateTime() {
        const now = new Date();

        const formattedDate = `${now.getDate().toString().padStart(2, '0')}.${(now.getMonth() + 1).toString().padStart(2,
            '0')}.${now.getFullYear()}`;
        const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;


        return {
            date: formattedDate,
            time: formattedTime
        };
    }

    const { date, time } = getFormattedDateTime();

    // FUNCTION STARTER -- clear and rerender table
    function renderStudentsTable(arr) {
        let tableContent = document.querySelector('.table_body');
        tableContent.innerHTML = '';
        arr.forEach((student) => {
            createStudentItem(student);
        });
    }

    renderStudentsTable(students);

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

    // DOM -- create students
    function createStudentItem(studentObj) {
        let row = createNewEl({
            tag: 'tr',
            params: {
                classList: 'table_row',
                id: studentObj.id
            },
            elements: [
                {
                    tag: 'td',
                    params: {
                        textContent: studentObj.id
                    }
                },
                {
                    tag: 'td',
                    params: {
                        textContent: studentObj.fullName
                    }
                },
                {
                    tag: 'td',
                    params: {
                        textContent: date
                    },
                    elements: [
                        {
                            params: {
                                textContent: time,
                                classList: 'text-muted'
                            }
                        }]
                },
                {
                    tag: 'td',
                    params: {
                        textContent: date
                    },
                    elements: [
                        {
                            params: {
                                textContent: time,
                                classList: 'text-muted'
                            }
                        }]
                },
                {
                    tag: 'td',
                    params: {
                        textContent: studentObj.contact
                    }
                },
                {
                    tag: 'td',
                    params: {
                        textContent: studentObj.contact
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

    // ARRAY --  create a student object
    function createNewStudent() {
        const newStudent = {
            id: generateUniqueId(),
            name: modifyItem(studentName.value),
            surName: modifyItem(studentSurname.value),
            lastName: modifyItem(studentPat.value),
            fullName: '',
            createdAtDate: date,
            createdAtHour: time,
            editedAtDate: date,
            editedAtHour: time,
            contacts: {
                Phone: '1122',
                Email: '3344'
            }
        };

        return newStudent
    }

    // VALIDATION LOGIC - validate entire form
    function validateForm() {
        let isValid = true;

        // Loop throo form field and validate each
        const formInputs = newStudentForm.querySelectorAll('input');
        formInputs.forEach(input => {
            const fieldName = input.getAttribute('id');
            const value = input.value;

            // console.log(studentName);
            // console.log(fieldName, value);

            if (!validateField(fieldName, value)) {
                isValid = false;
            } else {
                input.classList.remove('is-valid', 'is-invalid');
            }
        });

        return isValid;
    }

    // submiting the form with a new student
    newStudentForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // if (validateForm()) {
        createNewStudent(); // object
        newStudent.fullName(newStudent.name + ' ' + newStudent.surname)
        students.push(createNewStudent()); // array
        renderStudentsTable(students);
        newStudentForm.reset();
        dialog.close();
        // }
    })

})