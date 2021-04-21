export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        this._popup.classList.add('popup_opened');
    }

    close() {
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(popup) {
        document.addEventListener('keyup', (evt) => {
            if (evt.key === 'Escape' && popup.classList.contains('popup_opened')) {
                popup.classList.remove('popup_opened');
            }
        });
    }

    setEventListeners() {
        this._popup.addEventListener('mousedown', (evt) => {
            const elementClasses = evt.target.classList;
            if (elementClasses.contains('popup_opened')) {
                this.close();
            }
            if (elementClasses.contains('button_type_close')) {
                this.close();
            }
        });
        this._handleEscClose(this._popup);
    }
}