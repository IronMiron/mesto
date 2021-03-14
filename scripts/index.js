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
const cardsSection = document.querySelector('.cards');
const settings = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_type_save',
  inactiveButtonClass: '.button_type_disabled',
  inputErrorClass: '.popup__input_type_error',
  errorClass: ''
}

export function pressKey(evt) {
  if (evt.key === 'Escape') {
    const curPopup = document.querySelector('.popup_opened');
    if (curPopup) {
      closePopup();
    }
  }
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
  const cardElement = new Card({ name: popupInputDescr.value, link: popupInputUrl.value }, '#card');
  cardsSection.prepend(cardElement.getCard());
  document.forms.addForm.reset();
  closePopup();
}

function showEditPopup(evt) {
  popupInputName.value = profileName.textContent;
  popupInputOccupation.value = profileOccupation.textContent;
  openPopup(editFormContainer);
  validator.validateForm(editFormContainer);
}

function showAddPopup(evt) {
  document.forms.addForm.reset();
  openPopup(addFormContainer);
  validator.validateForm(addFormContainer);
}

document.querySelector('.button_type_edit').addEventListener('click', showEditPopup);
document.querySelector('.button_type_add').addEventListener('click', showAddPopup);
editFormContainer.addEventListener('submit', saveAndCloseEdit);
addFormContainer.addEventListener('submit', saveAndCloseAdd);
initialCards.forEach((item) => {
  const cardElement = new Card(item, '#card');
  cardsSection.prepend(cardElement.getCard());
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
const validator = new FormValidator(settings);
validator.enableValidation();
