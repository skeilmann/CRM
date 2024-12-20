// Form and Validation Rules
const newClientForm = document.querySelector('.form--new');

const validationRules = {
    name: {
        name: 'Name of client',
        minLength: 3,
        required: true,
        errorMessage: 'Name should have at least 3 characters',
        okMessage: 'Name meets the criteria!'
    },
    surname: {
        name: 'Surname of client',
        minLength: 2,
        required: false,
        errorMessage: 'Surname should have at least 2 characters',
        okMessage: 'Surname meets the criteria!'
    },
    lastName: {
        name: 'Last name of client',
        minLength: 5,
        errorMessage: 'Last name should have at least 5 characters',
        okMessage: 'Last name meets the criteria!'
    }
};

// Toggle Validation Message
function toggleMessageValidation(fieldElement, isValid, message) {
    const parentElement = fieldElement.parentElement;
    let messageContainer = parentElement.querySelector('.validation-message');

    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.classList.add('validation-message');
        parentElement.appendChild(messageContainer);
    }

    // Update Message and Styling
    messageContainer.textContent = message;
    if (isValid) {
        // fieldElement.classList.add('is-valid');
        // fieldElement.classList.remove('is-invalid');
        messageContainer.classList.add('text-success');
        messageContainer.classList.remove('text-danger');
    } else {
        // fieldElement.classList.add('is-invalid');
        // fieldElement.classList.remove('is-valid');
        messageContainer.classList.add('text-danger');
        messageContainer.classList.remove('text-success');
    }
}

// Validate Field by Rules
function validateField(fieldElement, rules) {
    const value = fieldElement.value.trim();

    // Check required
    if (rules.required && value.length === 0) {
        toggleMessageValidation(fieldElement, false, rules.errorMessage || 'This field is required.');
        return false;
    }

    // Check minLength
    if (rules.minLength && value.length < rules.minLength) {
        toggleMessageValidation(fieldElement, false, rules.errorMessage);
        return false;
    }

    // Pass Validation
    toggleMessageValidation(fieldElement, true, rules.okMessage);
    return true;
}

// Validate Entire Form
export function validateForm() {
    let isValid = true;
    const formInputs = newClientForm.querySelectorAll('input');

    formInputs.forEach(input => {
        const fieldName = input.getAttribute('name');
        const rules = validationRules[fieldName];


        if (rules) {
            if (!validateField(input, rules)) {
                isValid = false;
            }
        }
    });

    return isValid;
}

export function resetModalState() {
    // const form = newClientForm;

    if (newClientForm) {
        // Reset the form fields to their default values
        newClientForm.reset();

        // Remove validation messages and classes
        const inputs = newClientForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            // input.classList.remove('is-valid', 'is-invalid');

            // Remove validation message
            const messageContainer = input.parentElement.querySelector('.validation-message');
            if (messageContainer) {
                messageContainer.remove();
            }
        });
    }
}