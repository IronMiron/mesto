const editFormContainer = document.querySelector('#editForm');
const addFormContainer = document.querySelector('#addForm');
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
    popupInputName.value = profileName.textContent;
    popupInputOccupation.value = profileOccupation.textContent;
    openPopup(editFormContainer);
//    validateInput();
}

function showAddPopup(evt) {
    openPopup(addFormContainer);
//    validateInput();
}

function closePopup(evt) {
    let curPopup;
    if (evt) {
        curPopup = evt.target.closest('.popup');
    }
    else {
        curPopup = document.querySelector('.popup_opened');
    }
    curPopup.classList.remove('popup_opened');
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
}

function saveAndCloseEdit(evt) {
    evt.preventDefault();
    profileName.textContent = popupInputName.value;
    profileOccupation.textContent = popupInputOccupation.value;
    document.forms.editForm.reset();
    closePopup(evt);
}

function saveAndCloseAdd(evt) {
    evt.preventDefault();
    cardsSection.prepend(createCard(popupInputDescr.value, popupInputUrl.value));
    document.forms.addForm.reset();
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

//function pressKey(evt) {
//    if(evt.key === 'Escape') {
//        const curPopup = document.querySelector('.popup_opened');
//        if (curPopup) {
//            closePopup();
//        }
//    }
//}

//function clickOverlay(evt) {
//    if (evt.target.classList.contains('popup')) {
//        closePopup(evt);
//    }
//}



document.querySelector('.button_type_edit').addEventListener('click', showEditPopup);
document.querySelector('.button_type_add').addEventListener('click', showAddPopup);
document.querySelectorAll('.button_type_close').forEach((item) => {
    item.addEventListener('click', closePopup);
});
editFormContainer.addEventListener('submit', saveAndCloseEdit);
addFormContainer.addEventListener('submit', saveAndCloseAdd);
initialCards.forEach((item) => {
    cardsSection.prepend(createCard(item.name, item.link));
});
//document.querySelectorAll('.popup').forEach((item) => {
//    item.addEventListener('mousedown', clickOverlay);
//});
//document.addEventListener('keyup', pressKey);
//enableValidation({
//    formSelector: '.popup__container',
//    inputSelector: '.popup__input',
//    submitButtonSelector: '.button_type_save',
//    inactiveButtonClass: '.button_type_disabled',
//    inputErrorClass: '.popup__input_type_error',
//    errorClass: ''
//});