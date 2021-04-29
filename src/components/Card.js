export default class Card {
    constructor(data, templateSelector, handleCardClick, handleTrashClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._ownerId = data.owner._id;
        this._picId = data._id;
        this._template = document.querySelector(templateSelector).content;
        this._handlePicClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
        this._handleLikeClick = handleLikeClick;
    }

    getCard() {
        if (!this._element) {
            this._element = this._getTemplate();
            this._setPicture();
            this._setDescription();
            this._setLikes();
            this._setTrash();
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

    _setLikes() {
        const cardLikes = this._element.querySelector('.card__likes-counter');
        cardLikes.textContent = this._likes.length;
        if (this._isLiked()) {
            const cardLike = this._element.querySelector('.button_type_like');
            cardLike.classList.add('button_type_liked');
        }
    }

    _setTrash() {
        const cardTrash = this._element.querySelector('.button_type_trash');
        cardTrash.hidden = !this._isDeletable();
    }

    _isDeletable() {
        return (this._userId === this._ownerId)
    }

    _isLiked() {
        return (this._likes.find((like, index) => {
            return (like._id === this._userId) ? true : false;
        })) ? true : false;
    }

    _setEventListeners() {
        this._element.querySelector('.button_type_trash').addEventListener('click', (evt) => {
            this._handleTrashClick(evt);
        });
        this._element.querySelector('.button_type_like').addEventListener('click', (evt) => {
            this._handleLikeClick(evt);
        });
        this._element.querySelector('.card__pic').addEventListener('click', () => {
            this._handlePicClick({ name: this._name, link: this._link });
        });
    }
}