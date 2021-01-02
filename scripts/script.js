const popup = document.querySelector('#inputForm');
const cardImage = document.querySelector('#cardImage');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupHeader = document.querySelector('.popup__header');
const popupInput01 = document.querySelector('#input01');
const popupInput02 = document.querySelector('#input02');
const popupEdit = document.querySelector('.popup__container');
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
    if (evt.toElement.className.includes('button_type_edit')) {
        popupEdit.name = 'profileEdit';
        popupHeader.textContent = 'Редактировать профиль';
        popupInput01.value = profileName.textContent;
        popupInput01.placeholder = 'Имя';
        popupInput02.value = profileOccupation.textContent;
        popupInput02.placeholder = 'Профессия';
    }
    else if (evt.toElement.className.includes('button_type_add')) {
        popupEdit.name = 'cardAdd';
        popupHeader.textContent = 'Новое место';
        popupInput01.value = '';
        popupInput01.placeholder = 'Название';
        popupInput02.value = '';
        popupInput02.placeholder = 'Ссылка на картинку';
    }
    else return;
    popup.classList.add('popup_opened');
}

function closePopup(evt) {
    function close(evt) {
        evt.target.closest('.popup').classList.remove('popup_opened');
        evt.target.closest('.popup').classList.remove('popup_closing');
    }
    evt.target.closest('.popup').classList.add('popup_closing');
    setTimeout( close, 1000, evt);
}

function saveAndClose(evt) {
    evt.preventDefault();
    if (popupEdit.name === 'profileEdit') {
        profileName.textContent = popupInput01.value;
        profileOccupation.textContent = popupInput02.value;
    }
    else if (popupEdit.name === 'cardAdd') {
        cardAdd(popupInput01.value, popupInput02.value);
    }
    closePopup(evt);
}

function cardAdd(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__pic').src = link;
    cardElement.querySelector('.card__pic').alt = name;
    cardElement.querySelector('.card__descr').textContent = name;
    cardElement.querySelector('.button_type_trash').addEventListener('click', cardRemove);
    cardElement.querySelector('.button_type_like').addEventListener('click', cardLike);
    cardElement.querySelector('.card__pic').addEventListener('click', showImagePopup);
    cardsSection.prepend(cardElement);
}

function cardRemove(evt) {
    evt.target.closest('.card').remove();
}

function cardLike(evt) {
    evt.target.classList.toggle('button_type_liked');
}

function showImagePopup(evt) {
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.alt;
    cardImage.classList.add('popup_opened');
}



document.querySelector('.button_type_edit').addEventListener('click', showEditPopup);
document.querySelector('.button_type_add').addEventListener('click', showEditPopup);
document.querySelectorAll('.button_type_close').forEach((item) => {
    item.addEventListener('click', closePopup);
});
popupEdit.addEventListener('submit', saveAndClose);
initialCards.forEach((item) => {
    cardAdd(item.name, item.link);
});