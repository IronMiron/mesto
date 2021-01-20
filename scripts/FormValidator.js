export default class FormValidator {
    constructor(settings) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
    }

    enableValidation() {
        const formsList = Array.from(document.querySelectorAll(this._formSelector));
        formsList.forEach((form) => {
            this._setEventListeners(form);
        });
    }

    validateForm(formElement) {
        const buttonElement = formElement.querySelector(this._submitButtonSelector);
        const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));
        const state = inputsList.reduce((prevVal, input) => this._isValid(input) && prevVal, true)
        this._toggleSubmitButton(buttonElement, state)
    }

    _addClass(element, newClass) {
        element.classList.add(newClass.slice(1));
    }

    _removeClass(element, remClass) {
        element.classList.remove(remClass.slice(1));
    }

    _toggleSubmitButton(buttonElement, state) {
        if (state) {
            this._removeClass(buttonElement, this._inactiveButtonClass);
            buttonElement.disabled = false;
        }
        else {
            this._addClass(buttonElement, this._inactiveButtonClass);
            buttonElement.disabled = true;
        }
    }

    _hideInputError(inputElement, errorElement) {
        this._removeClass(inputElement, this._inputErrorClass);
        errorElement.textContent = '';
    }

    _showInputError(inputElement, errorElement, errorMessage) {
        this._addClass(inputElement, this._inputErrorClass);
        errorElement.textContent = errorMessage;
    }

    _isValid(inputElement) {
        const state = inputElement.validity.valid;
        const errorElement = document.querySelector(`.${inputElement.name}-error`);
        if (state) {
            this._hideInputError(inputElement, errorElement);
        }
        else {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorElement, errorMessage);
        }
        return state;
    }

    _setEventListeners(formElement) {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const inputsList = Array.from(formElement.querySelectorAll(this._inputSelector));
        inputsList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this.validateForm(formElement);
            });
        });
    }
}