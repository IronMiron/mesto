let popup = document.querySelector('.popup');
let edit_btn = document.querySelector('.profile__button_fnc_edit');
let close_btn = document.querySelector('.popup__button_fnc_close');
let save_btn = document.querySelector('.popup__button_fnc_save');
let profile_name = document.querySelector('.profile__field_name');
let profile_occupation = document.querySelector('.profile__field_occupation');
let popup_name = document.querySelector('.popup__input_name');
let popup_occupation = document.querySelector('.popup__input_occupation');

function showEditPopup() {
    popup.classList.add('popup_opened');
}

function closeEditPopup() {
    popup.classList.remove('popup_opened');
}

function saveAndClose() {
    popup.classList.remove('popup_opened');
}

edit_btn.addEventListener('click', showEditPopup);
close_btn.addEventListener('click', closeEditPopup);
save_btn.addEventListener('click', saveAndClose);