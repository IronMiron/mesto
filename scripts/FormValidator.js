export default class FormValidator {
    constructor(settings, form) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._form = form;
        this._button = this._form.querySelector(this._submitButtonSelector);
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    }

    enableValidation() {
        this._setEventListeners();
    }

    validateForm() {
        const state = this._inputList.reduce((prevVal, input) => this._isValid(input) && prevVal, true)
        this._toggleSubmitButton(state)
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            const errorElement = document.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement, errorElement)
        });
        this._toggleSubmitButton(false);
    }

    _addClass(element, newClass) {
        element.classList.add(newClass.slice(1));
    }

    _removeClass(element, remClass) {
        element.classList.remove(remClass.slice(1));
    }

    _toggleSubmitButton(state) {
        if (state) {
            this._removeClass(this._button, this._inactiveButtonClass);
            this._button.disabled = false;
        }
        else {
            this._addClass(this._button, this._inactiveButtonClass);
            this._button.disabled = true;
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
        const errorElement = document.querySelector(`.${inputElement.id}-error`);
        if (state) {
            this._hideInputError(inputElement, errorElement);
        }
        else {
            const errorMessage = inputElement.validationMessage;
            this._showInputError(inputElement, errorElement, errorMessage);
        }
        return state;
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._inputList.forEach((input) => {
            input.addEventListener('input', (evt) => {
                this.validateForm(this._form);
            });
        });
    }
}