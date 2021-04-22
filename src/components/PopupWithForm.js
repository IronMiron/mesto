import Popup from "./Popup.js";
import Validator from "./FormValidator.js";
import { settings } from "../utils/settings.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this.validator = new Validator(settings, this._popup);
        this.validator.enableValidation();
    }

    _getInputValues() {
        const valueArray = [];
        this.validator._inputList.forEach(input => {
            valueArray.push(input.value);
        });
        console.log(valueArray);
        return valueArray;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            const valueArray = this._getInputValues();
            this._submitHandler(valueArray);
        });
    }

    close() {
        super.close();
        this.validator._inputList.forEach(input => {
            input.value = '';
        });
    }
}