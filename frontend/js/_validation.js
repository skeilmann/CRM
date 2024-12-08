const validationRules = {
    name: {
        name: 'Name of student',
        minLength: 3,
        required: true,
        errorMessage: 'Name should have at least 3 characters',
        okMessage: 'Name meet the criteria!'
    },
    surname: {
        name: 'Surname of student',
        minLength: 2,
        required: false,
        errorMessage: 'Surname should have at least 2 characters',
        okMessage: 'Surname meet the criteria!'
    },
    pat: {
        name: 'Patname of student',
        minLength: 5,
        errorMessage: 'Patname should have at least 5 characters',
        okMessage: 'Patname meet the criteria!'
    },
    studyStart: {
        name: 'Date of started study',
        minimumNumber: 2000,
        errorMessage: 'Date when started study should be from 2000 till today',
        okMessage: 'Here all is corect!'
    },
    faculty: {
        name: 'Faculty',
        required: true,
        errorMessage: 'Please select a course',
        okMessage: 'Course selection is valid!',
    },
    agreement: {
        name: 'Agreement',
        checked: true,
        errorMessage: 'Please accept the agreement to proceed',
        okMessage: 'Agreement accepted!'
    }
}

function validateDate(dateString, min) {
    // Convert the input string to a Date object
    const inputDate = new Date(dateString);
    let currentDate = new Date();

    // Check if the inputDate is a valid Date object
    let isValidDate = !isNaN(inputDate);
    // Check if the inputDate is after the minimumDate
    let isAfterMinimumDate = inputDate >= min;
    // Check if the inputDate is before today;
    let isBeforeCurrentDate = inputDate <= currentDate;

    return isValidDate && isAfterMinimumDate && isBeforeCurrentDate;

}

function toggleMessageValidation(fieldName, errorMessage, okMessage) {
    const fieldElement = document.getElementById(fieldName);
    const parentElement = fieldElement.parentElement;
    let messageContainer = parentElement.querySelector('.validation-message');
    let nextEl = fieldElement.nextElementSibling;
    parentElement.style.position = 'relative';


    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.classList.add('validation-message');
        parentElement.appendChild(messageContainer);
    }

    if (errorMessage) {
        messageContainer.textContent = errorMessage;
        messageContainer.classList.add('text-danger');
        messageContainer.classList.remove('text-success');
        fieldElement.classList.remove('is-valid');
        fieldElement.classList.add('is-invalid');
        nextEl.classList.add('invisible');

    } else {
        messageContainer.textContent = okMessage;
        messageContainer.classList.remove('text-danger');
        messageContainer.classList.add('text-success');
        fieldElement.classList.remove('is-invalid');
        fieldElement.classList.add('is-valid');

        nextEl.classList.add('invisible');

    }
}

// Function to validate specific field based on its name and value
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    const checkbox = document.getElementById(fieldName);

    if (!rules) {
        return true;
    }

    if (rules.required && value.trim().length === 0) {
        toggleMessageValidation(fieldName, rules.errorMessage, '');
        return false;
    }

    if (rules.minLength && value.trim().length < rules.minLength) {
        toggleMessageValidation(fieldName, rules.errorMessage, '');
        return false;
    }

    if (rules.minimumDate && !validateDate(value, rules.minimumDate)) {
        toggleMessageValidation(fieldName, rules.errorMessage, '');
        return false;
    }

    if (rules.minimumNumber && !(value >= rules.minimumNumber)) {
        toggleMessageValidation(fieldName, rules.errorMessage, '');
        return false;
    }

    if (rules.required && (value === null || value === undefined)) {
        toggleMessageValidation(fieldName, rules.errorMessage, '');
        return false;
    }

    if (rules.checked && !checkbox.checked) {
        toggleMessageValidation(fieldName, rules.errorMessage, '');
        return false;
    }

    toggleMessageValidation(fieldName, '', rules.okMessage);
    return true;
}

// Function to validate entire form
function validateForm() {
    let isValid = true;

    // Loop throo form field and validate each
    const formInputs = newStudentForm.querySelectorAll('input');
    formInputs.forEach(input => {
        const fieldName = input.getAttribute('id');
        const value = input.value;
        if (!validateField(fieldName, value)) {
            isValid = false;
        } else {
            input.classList.remove('is-valid', 'is-invalid');
        }
    });

    return isValid;
}