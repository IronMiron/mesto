function enableValidation(settings) {
    for (let setting in settings) {
        enableValidation[setting] = settings[setting];
    }
    const formsList = Array.from(document.querySelectorAll(settings.formSelector));
    formsList.forEach((form) => {
        const inputsList = Array.from(form.querySelectorAll(settings.inputSelector));
        inputsList.forEach((input) => {
            input.addEventListener('input', validateInput);
        })
    });
}

function validateForm(formElement) {
    let buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
    let inputsList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
    let state = inputsList.reduce((prevVal, input) => isValid(input) && prevVal, true)
    toggleSubmitButton(buttonElement, state)
}

function validateInput(evt) {
    const formElement = evt.target.closest(enableValidation.formSelector);
    validateForm(formElement);
}

function isValid(inputElement) {
    const state = inputElement.validity.valid;
    const errorElement = document.querySelector(`.${inputElement.name}-error`);
    if (state) {
        hideInputError(inputElement, errorElement);
    }
    else {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorElement, errorMessage);
    }
    return state;
}

function showInputError(inputElement, errorElement, errorMessage) {
    addClass(inputElement, enableValidation.inputErrorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(inputElement, errorElement) {
    removeClass(inputElement, enableValidation.inputErrorClass);
    errorElement.textContent = '';
}

function toggleSubmitButton(buttonElement, state) {
    if (state) {
        removeClass(buttonElement, enableValidation.inactiveButtonClass);
        buttonElement.disabled = false;
    }
    else {
        addClass(buttonElement, enableValidation.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function addClass(element, newClass) {
    element.classList.add(newClass.slice(1));
}

function removeClass(element, remClass) {
    element.classList.remove(remClass.slice(1));
}