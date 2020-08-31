let popup = document.querySelector('.popup');
let popupEditButton = document.querySelector('.profile__edit-btn');
let popupCloseButton = popup.querySelector('.popup__close-btn');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let popupForm = document.querySelector('.popup__form');
let fieldName = popup.querySelector('.popup__field-name');
let fieldAbout = popup.querySelector('.popup__field-about');



const popupToggle = function() {
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;

  popup.classList.toggle('popup_opened');
}

popupEditButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);



const popupCloseByCkickOnOverlay = function(event) {
  if (event.target != event.currentTarget) {
    return
  }
  popupToggle();
}

popup.addEventListener('click', popupCloseByCkickOnOverlay);



const formSubmitHandler = function (submitEvt) {
    submitEvt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    profileName.textContent = fieldName.value;
    profileAbout.textContent = fieldAbout.value;

    popupToggle();
}

popupForm.addEventListener('submit', formSubmitHandler);






