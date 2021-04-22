import Popup from "./Popup.js";
import { settings } from "../utils/settings.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._inputList = Array.from(this._popup.querySelectorAll(settings.inputSelector));
    }

    _getInputValues() {
        let values = {};
        this._inputList.forEach(input => {
            values[input.id] = input.value;
        });
        return values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            const values = this._getInputValues();
            this._submitHandler(values);
        });
    }

    close() {
        super.close();
        this._inputList.forEach(input => {
            input.value = '';
        });
    }
}