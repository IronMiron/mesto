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
const popupImageTitle = document.querySelector('.popup__image-title');
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
    validateForm(editFormContainer, settings);
}

function showAddPopup(evt) {
    document.forms.addForm.reset();
    openPopup(addFormContainer);
    validateForm(addFormContainer, settings);
}

function showImagePopup(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupImageTitle.textContent = name;
    openPopup(cardImage);
}

function closePopup(evt) {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
    document.removeEventListener('keyup', pressKey);
}

function openPopup(popupElement) {
    document.addEventListener('keyup', pressKey);
    popupElement.classList.add('popup_opened');
}

function saveAndCloseEdit(evt) {
    profileName.textContent = popupInputName.value;
    profileOccupation.textContent = popupInputOccupation.value;
    document.forms.editForm.reset();
    closePopup();
}

function saveAndCloseAdd(evt) {
    cardsSection.prepend(createCard(popupInputDescr.value, popupInputUrl.value));
    document.forms.addForm.reset();
    closePopup();
}

function createCard(name, link) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardPic = cardElement.querySelector('.card__pic');
    cardPic.src = link;
    cardPic.alt = name;
    cardElement.querySelector('.card__descr').textContent = name;
    cardElement.querySelector('.button_type_trash').addEventListener('click', removeCard);
    cardElement.querySelector('.button_type_like').addEventListener('click', likeCard);
    cardPic.addEventListener('click', () => {
        showImagePopup(name, link);
    });
    return cardElement;
}

function removeCard(evt) {
    evt.target.closest('.card').remove();
}

function likeCard(evt) {
    evt.target.classList.toggle('button_type_liked');
}

function pressKey(evt) {
    if(evt.key === 'Escape') {
        const curPopup = document.querySelector('.popup_opened');
        if (curPopup) {
            closePopup();
        }
    }
}



document.querySelector('.button_type_edit').addEventListener('click', showEditPopup);
document.querySelector('.button_type_add').addEventListener('click', showAddPopup);
editFormContainer.addEventListener('submit', saveAndCloseEdit);
addFormContainer.addEventListener('submit', saveAndCloseAdd);
initialCards.forEach((item) => {
    cardsSection.prepend(createCard(item.name, item.link));
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