let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.button_type_edit');
let closeBtn = document.querySelector('.button_type_close');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let popupName = document.querySelector('.popup__input_val_name');
let popupOccupation = document.querySelector('.popup__input_val_occupation');
let popupEdit = document.querySelector('.popup__container');

function showEditPopup() {
    popupName.value = profileName.textContent;
    popupOccupation.value = profileOccupation.textContent;
    popup.classList.add('popup_opened');
}

function closeEditPopup() {
    popup.classList.remove('popup_opened');
}

function saveAndClose(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    closeEditPopup();
}

editBtn.addEventListener('click', showEditPopup);
closeBtn.addEventListener('click', closeEditPopup);
popupEdit.addEventListener('submit', saveAndClose);