import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards } from "./initial-cards.js";

const editFormContainer = document.querySelector('#editForm');
const addFormContainer = document.querySelector('#addForm');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupInputName = document.querySelector('#inputName');
const popupInputOccupation = document.querySelector('#inputOccupation');
const popupInputDescr = document.querySelector('#inputDescr');
const popupInputUrl = document.querySelector('#inputUrl');
const popupElement = document.querySelector('#cardImage');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');
const cardsSection = document.querySelector('.cards');
const settings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: '.button_type_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: ''
}

function pressKey(evt) {
  if (evt.key === 'Escape') {
    const curPopup = document.querySelector('.popup_opened');
    if (curPopup) {
      closePopup();
    }
  }
}

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageTitle.textContent = name;
  popupElement.classList.add('popup_opened');
  document.addEventListener('keyup', pressKey);
}

function openPopup(popupElement) {
  document.addEventListener('keyup', pressKey);
  popupElement.classList.add('popup_opened');
}

function closePopup(evt) {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
  document.removeEventListener('keyup', pressKey);
}

function saveAndCloseEdit(evt) {
  profileName.textContent = popupInputName.value;
  profileOccupation.textContent = popupInputOccupation.value;
  document.forms.editForm.reset();
  closePopup();
}

function saveAndCloseAdd(evt) {
  cardsSection.prepend(createCard({ name: popupInputDescr.value, link: popupInputUrl.value }));
  document.forms.addForm.reset();
  closePopup();
}

function showEditPopup(evt) {
  popupInputName.value = profileName.textContent;
  popupInputOccupation.value = profileOccupation.textContent;
  openPopup(editFormContainer);
  const validator = new FormValidator(settings, editFormContainer);
  validator.resetValidation();
}

function showAddPopup(evt) {
  document.forms.addForm.reset();
  openPopup(addFormContainer);
  const validator = new FormValidator(settings, addFormContainer);
  validator.resetValidation();
}

function createCard(data) {
  const cardElement = new Card(data, '#card', handleCardClick);
  return cardElement.getCard();
}

document.querySelector('.button_type_edit').addEventListener('click', showEditPopup);
document.querySelector('.button_type_add').addEventListener('click', showAddPopup);
editFormContainer.addEventListener('submit', saveAndCloseEdit);
addFormContainer.addEventListener('submit', saveAndCloseAdd);
initialCards.forEach((item) => {
  cardsSection.prepend(createCard(item));
});
document.querySelectorAll('.popup').forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    const elementClasses = evt.target.classList;
    if (elementClasses.contains('popup_opened')) {
      closePopup();
    }
    if (elementClasses.contains('button_type_close')) {
      closePopup();
    }
  });
});

Array.from(document.querySelectorAll(settings.formSelector)).forEach((form) => {
  const validator = new FormValidator(settings, form);
  validator.enableValidation();
});
