export default class Card {
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content;
        this._handlePicClick = handleCardClick;
    }

    getCard() {
        if (!this._element) {
            this._element = this._getTemplate();
            this._setPicture();
            this._setDescription();
            this._setEventListeners();
        }
        return this._element;
    }

    _getTemplate() {
        return this._template.cloneNode(true);
    }

    _setPicture() {
        const cardPicture = this._element.querySelector('.card__pic');
        cardPicture.src = this._link;
        cardPicture.alt = this._name;
    }

    _setDescription() {
        const cardDescription = this._element.querySelector('.card__descr');
        cardDescription.textContent = this._name;
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_trash').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });
        this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });
        this._element.querySelector('.card__pic').addEventListener('click', () => {
            this._handlePicClick({name: this._name, link: this._link});
        });
    }

    _handleTrashClick(evt) {
        evt.target.closest('.card').remove();
        this._element = null;
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('button_type_liked');
    }

}