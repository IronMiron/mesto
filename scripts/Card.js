import {pressKey} from "./index.js";

const popupElement = document.querySelector('#cardImage');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

export default class Card {
    constructor(data, templateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(templateSelector).content;
    }

    getCard() {
        const cardElement = this._template.cloneNode(true);
        this._setPic(cardElement);
        this._setDescr(cardElement);
        this._setEventListeners(cardElement);
        return cardElement;
    }

    _setPic(cardElement) {
        const cardPic = cardElement.querySelector('.card__pic');
        cardPic.src = this._link;
        cardPic.alt = this._name;
    }

    _setDescr(cardElement) {
        const cardDescr = cardElement.querySelector('.card__descr');
        cardDescr.textContent = this._name;
    }

    _setEventListeners(cardElement) {
        cardElement.querySelector('.button_type_trash').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });
        cardElement.querySelector('.button_type_like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });
        cardElement.querySelector('.card__pic').addEventListener('click', () => {
            this._handlePicClick();
        });
    }

    _handleTrashClick(evt) {
        evt.target.closest('.card').remove();
    }

    _handleLikeClick(evt) {
        evt.target.classList.toggle('button_type_liked');
    }

    _handlePicClick() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupImageTitle.textContent = this._name;
        popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', pressKey)
    }
}