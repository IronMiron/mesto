export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(evt) {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
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
    }
}