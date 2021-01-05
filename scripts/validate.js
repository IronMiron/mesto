const settings = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.button_type_save',
    inactiveButtonClass: '.button_type_disabled',
    inputErrorClass: '.popup__input_type_error',
    errorClass: ''
}

function enableValidation(settings) {
    const formsList = Array.from(document.querySelectorAll(settings.formSelector));
    formsList.forEach((form) => {
        setEventListeners(form, settings);
    });
}

function setEventListeners(formElement, settings) {
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    const inputsList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputsList.forEach((input) => {
        input.addEventListener('input', (evt) => {
            validateForm(formElement, settings);
        });
    });
}

function validateForm(formElement, settings) {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    const inputsList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const state = inputsList.reduce((prevVal, input) => isValid(input, settings) && prevVal, true)
    toggleSubmitButton(buttonElement, state, settings)
}

function isValid(inputElement, settings) {
    const state = inputElement.validity.valid;
    const errorElement = document.querySelector(`.${inputElement.name}-error`);
    if (state) {
        hideInputError(inputElement, errorElement, settings);
    }
    else {
        const errorMessage = inputElement.validationMessage;
        showInputError(inputElement, errorElement, errorMessage, settings);
    }
    return state;
}

function showInputError(inputElement, errorElement, errorMessage, settings) {
    addClass(inputElement, settings.inputErrorClass);
    errorElement.textContent = errorMessage;
}

function hideInputError(inputElement, errorElement, settings) {
    removeClass(inputElement, settings.inputErrorClass);
    errorElement.textContent = '';
}

function toggleSubmitButton(buttonElement, state, settings) {
    if (state) {
        removeClass(buttonElement, settings.inactiveButtonClass);
        buttonElement.disabled = false;
    }
    else {
        addClass(buttonElement, settings.inactiveButtonClass);
        buttonElement.disabled = true;
    }
}

function addClass(element, newClass) {
    element.classList.add(newClass.slice(1));
}

function removeClass(element, remClass) {
    element.classList.remove(remClass.slice(1));
}



enableValidation(settings);