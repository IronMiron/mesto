function enableValidation(settings) {
    for (let setting in settings) {
        enableValidation[setting] = settings[setting];
    }
    const formsList = Array.from(document.querySelectorAll(settings.formSelector));
    formsList.forEach((form) => {
        const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
        inputList.forEach((input) => {
            input.addEventListener('input', validateInput);
        })
    });
}

function validateInput(evt) {
    let formList = [];
    if (evt ===undefined) {
        formList = Array.from(document.querySelectorAll(enableValidation.formSelector));
    }
    else {
        formList = [evt.target.closest(enableValidation.formSelector)]
    }
    formList.forEach((formElement) => {
        let buttonElement = formElement.querySelector(enableValidation.submitButtonSelector);
        let inputList = Array.from(formElement.querySelectorAll(enableValidation.inputSelector));
        let state = inputList.reduce((prevVal, input) => {
            if ((!isValid(input)) || prevVal === false) {
                return false;
            }
            else {
                return true;
            }
        }, true)
        toggleSubmitButton(buttonElement, state)
    })
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