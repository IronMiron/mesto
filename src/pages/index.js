import Card from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Validator from "../components/FormValidator.js";
import { settings } from "../utils/settings.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const popupInputName = document.querySelector('#inputName');
const popupInputOccupation = document.querySelector('#inputOccupation');

const curUserInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__occupation',
});

const popupCard = new PopupWithImage('#cardImage');
popupCard.setEventListeners();

const cardsSection = new Section({
  items: initialCards, 
  renderer: (item) => {
    const cardElement = new Card(item, '#card', ({name, link}) => {
      popupCard.open({name, link});
    });
    return cardElement.getCard();
  }}, '.cards');
cardsSection.renderItems();

const addValidator = new Validator(settings, '#addForm');
addValidator.enableValidation();
const addPopup = new PopupWithForm('#addForm', (values) => {
  cardsSection.addItem({
    name: values.inputDescr,
    link: values.inputUrl,
  });
  addPopup.close();
});
addPopup.setEventListeners();

const editValidator = new Validator(settings, '#editForm');
editValidator.enableValidation();
const editPopup = new PopupWithForm('#editForm', (values) => {
  curUserInfo.setUserInfo({
    name: values.inputName,
    info: values.inputOccupation,
  });
  editPopup.close();
});
editPopup.setEventListeners();

document.querySelector('.button_type_edit').addEventListener('click', (evt) => {
  const {name, info} = curUserInfo.getUserInfo();
  popupInputName.value = name;
  popupInputOccupation.value = info;
  editPopup.open();
  editValidator.resetValidation();
});
document.querySelector('.button_type_add').addEventListener('click', (evt) => {
  addPopup.open()
  addValidator.resetValidation();
});
