import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Validator from "../components/FormValidator.js";
import { settings } from "../utils/settings.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";

function errHandler(err) {
  console.log(err);
}

const curUserInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__occupation',
  avatarSelector: '.profile__pic',
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  token: 'f7024036-fa68-48fd-8a0b-d0123a0676ea',
});

const popupCard = new PopupWithImage('#cardImage');
popupCard.setEventListeners();

const confirmPopup = new PopupWithConfirm('#confirm', (evt) => {
  api.deleteCard(confirmPopup._id)
    .then((res) => {
      confirmPopup._callerElement.remove();
      confirmPopup.close();
    })
    .catch(errHandler);
});
confirmPopup.setEventListeners();

const cardsSection = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = new Card(item, '#card', ({ name, link }) => {
      popupCard.open({ name, link });
    },
      (evt) => {
        confirmPopup.open(cardElement._picId, evt.target.closest('.card'));
      },
      (evt) => {
        api.likeCard(cardElement._picId, cardElement._isLiked())
          .then((card) => {
            evt.target.classList.toggle('button_type_liked');
            cardElement._likes = card.likes;
            evt.target.closest('.card__likes').querySelector('.card__likes-counter').textContent = cardElement._likes.length;
          })
          .catch(errHandler);
      });
    return cardElement.getCard();
  }
}, '.cards');

Promise.all([api.getUser(), api.getInitialCards()])
  .then((res) => {
    const [user, cards] = res;
    curUserInfo.setUserInfo({
      name: user.name,
      info: user.about,
    });
    curUserInfo.setAvatar(user.avatar);
    Card.prototype._userId = user._id;
    cards.reverse();
    cards.forEach((card) => {
      cardsSection.addItem(card);
    });
  })
  .catch(errHandler);

const addValidator = new Validator(settings, '#addForm');
addValidator.enableValidation();
const addPopup = new PopupWithForm('#addForm', (values) => {
  addPopup._submitButton.textContent = 'Создание...';
  api.insertCard({
    name: values.inputDescr,
    link: values.inputUrl,
  })
    .then((card) => {
      cardsSection.addItem(card);
    })
    .catch(errHandler)
    .finally(() => {
      addPopup._submitButton.textContent = 'Создать';
    });
  addPopup.close();
});
addPopup.setEventListeners();

const editValidator = new Validator(settings, '#editForm');
editValidator.enableValidation();
const editPopup = new PopupWithForm('#editForm', (values) => {
  editPopup._submitButton.textContent = 'Сохранение...';
  api.updateUser({
    name: values.inputName,
    about: values.inputOccupation,
  })
    .then((res) => {
      curUserInfo.setUserInfo({
        name: res.name,
        info: res.about,
      });
      editPopup.close();
    })
    .catch(errHandler)
    .finally(() => {
      editPopup._submitButton.textContent = 'Сохранить';
    });
});
editPopup.setEventListeners();

const avatarChangeValidator = new Validator(settings, '#avatarChange');
avatarChangeValidator.enableValidation();
const avatarChangePopup = new PopupWithForm('#avatarChange', (values) => {
  avatarChangePopup._submitButton.textContent = 'Сохранение...';
  api.updateAvatar(values.inputAvatarUrl)
    .then((user) => {
      curUserInfo.setAvatar(user.avatar);
      avatarChangePopup.close();
    })
    .catch(errHandler)
    .finally(() => {
      avatarChangePopup._submitButton.textContent = 'Сохранить';
    });
});
avatarChangePopup.setEventListeners();

const popupInputName = document.querySelector('#inputName');
const popupInputOccupation = document.querySelector('#inputOccupation');

document.querySelector('.button_type_edit').addEventListener('click', (evt) => {
  const { name, info } = curUserInfo.getUserInfo();
  popupInputName.value = name;
  popupInputOccupation.value = info;
  editPopup.open();
  editValidator.resetValidation();
});
document.querySelector('.button_type_add').addEventListener('click', (evt) => {
  addPopup.open()
  addValidator.resetValidation();
});
document.querySelector('.profile__pic').addEventListener('click', (evt) => {
  avatarChangePopup.open();
  avatarChangeValidator.resetValidation();
})