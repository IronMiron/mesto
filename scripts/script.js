const editForm = document.querySelector('#editForm');
const addForm = document.querySelector('#addForm');
const cardImage = document.querySelector('#cardImage');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupInputName = document.forms.editForm.elements.inputName;
const popupInputOccupation = document.forms.editForm.elements.inputOccupation;
const popupInputDescr = document.forms.addForm.elements.inputDescr;
const popupInputUrl = document.forms.addForm.elements.inputUrl;
const popupImage = document.querySelector('.popup__image');
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  const cardTemplate = document.querySelector('#card').content;
  const cardsSection = document.querySelector('.cards');



function showEditPopup(evt) {
    if (evt.target.className.includes('button_type_edit')) {
        popupInputName.value = profileName.textContent;
        popupInputOccupation.value = profileOccupation.textContent;
        openPopup(editForm);
    }
    else if (evt.target.className.includes('button_type_add')) {
        openPopup(addForm);
    }
    else return;
}

function closePopup(evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function saveAndClose(evt) {
    evt.preventDefault();
    const curForm = evt.target.closest('.popup__container');
    if (curForm.name === 'editForm') {
        profileName.textContent = popupInputName.value;
        profileOccupation.textContent = popupInputOccupation.value;
    }
    else if (curForm.name === 'addForm') {
        cardsSection.prepend(createCard(popupInputDescr.value, popupInputUrl.value));
    }
    curForm.reset();
    closePopup(evt);
}

function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardPic = cardElement.querySelector('.card__pic');
    cardPic.src = link;
    cardPic.alt = name;
    cardElement.querySelector('.card__descr').textContent = name;
    cardElement.querySelector('.button_type_trash').addEventListener('click', removeCard);
    cardElement.querySelector('.button_type_like').addEventListener('click', likeCard);
    cardPic.addEventListener('click', showImagePopup);
    return cardElement;
}

function removeCard(evt) {
    evt.target.closest('.card').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('button_type_liked');
}

function showImagePopup(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    openPopup(cardImage);
}



document.querySelector('.button_type_edit').addEventListener('click', showEditPopup);
document.querySelector('.button_type_add').addEventListener('click', showEditPopup);
document.querySelectorAll('.button_type_close').forEach((item) => {
    item.addEventListener('click', closePopup);
});
Array.from(document.forms).forEach((item) => {
    item.addEventListener('submit', saveAndClose);
});
initialCards.forEach((item) => {
    cardsSection.prepend(createCard(item.name, item.link));
});