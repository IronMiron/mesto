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

    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', this._submitHandler);
    }

    close() {
        super.close();
        for (var i = 0; i < document.forms.length; i++) {
            document.forms[i].reset();
        }
    }
}