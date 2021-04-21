import Card from "../components/Card.js";
import { initialCards } from "../utils/initial-cards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const popupInputName = document.querySelector('#inputName');
const popupInputOccupation = document.querySelector('#inputOccupation');
const popupInputDescr = document.querySelector('#inputDescr');
const popupInputUrl = document.querySelector('#inputUrl');

const curUserInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__occupation',
});

const addPopup = new PopupWithForm('#addForm', (evt) => {
  cardsSection.addItem({
    name: popupInputDescr.value,
    link: popupInputUrl.value,
  });
  addPopup.close();
});
addPopup.setEventListeners();

const editPopup = new PopupWithForm('#editForm', (evt) => {
  curUserInfo.setUserInfo({
    name: popupInputName.value,
    info: popupInputOccupation.value,
  });
  editPopup.close();
});
editPopup.setEventListeners();

document.querySelector('.button_type_edit').addEventListener('click', (evt) => {
  const {name, info} = curUserInfo.getUserInfo();
  popupInputName.value = name;
  popupInputOccupation.value = info;
  editPopup.open();
  editPopup.validator.resetValidation();
});
document.querySelector('.button_type_add').addEventListener('click', (evt) => {
  addPopup.open()
  addPopup.validator.resetValidation();
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
