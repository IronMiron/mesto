let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.button_type_edit');
let closeBtn = document.querySelector('.button_type_close');
let saveBtn = document.querySelector('.button_type_save');
let profileName = document.querySelector('.profile__name');
let profileOccupation = document.querySelector('.profile__occupation');
let popupName = document.querySelector('.popup__name');
let popupOccupation = document.querySelector('.popup__occupation');
let popupEdit = document.querySelector('.popup__container');

function showEditPopup() {
    popupName.value = profileName.textContent;
    popupOccupation.value = profileOccupation.textContent;
    popup.classList.add('popup_opened');
}

function closeEditPopup() {
    popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', showEditPopup);
closeBtn.addEventListener('click', closeEditPopup);
popupEdit.addEventListener('submit', function saveAndClose(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileOccupation.textContent = popupOccupation.value;
    closeEditPopup();
});