import Card from './Card.js';
import FormValidator from './FormValidator.js';

const initialCards  = [
  {
      name: 'Архыз',
      link: 'https://artlist.pro/images/photos/o/p/38/15967/4273039179f70aa43ac18f5fadaaa642.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Вулкан Малый Семячик',
      link: 'https://content-18.foto.my.mail.ru/community/allweneed/_groupsphoto/h-120922.jpg'
  },
  {
    name: 'Каменные идолы Балбанью — гора Кисилях',
    link: 'https://i.pinimg.com/originals/49/35/07/4935077878547dee71139f7540a5ab5f.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popup = document.getElementById('popup');
const popupEditButton = document.querySelector('.profile__edit-btn');
const closeButtonEdit = popup.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupEditForm = popup.querySelector('.popup__form');
const fieldName = popup.querySelector('.popup__field-name');
const fieldAbout = popup.querySelector('.popup__field-about');

const addButton = document.querySelector('.profile__add-btn');
const popupAdd = document.getElementById('popup-add');
const closeButton = popupAdd.querySelector('.popup__close-btn');
const cardsContainer = document.querySelector('.cards');//это контейнер для карточек

const popupForm = document.querySelector('.popup__form-add');
const fieldTitle = popupAdd.querySelector('.popup__field-title');
const fieldImage = popupAdd.querySelector('.popup__field-image');

export const popupImg = document.getElementById('popup-image');
export const scaleImg = popupImg.querySelector('.popup-image__scale-photo');
export const scaleText = popupImg.querySelector('.popup-image__text');
const closeButtonImg = popupImg.querySelector('.popup__close-btn');

export const allClasses = {
  formSelector: '.popup__form',
  formEditSelector: '.popup__form-edit',
  formAddSelector: '.popup__form-add',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};


//открытие модального окна
export function openModal(val) {
  val.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEsc);
}


//закрытие модального окна
function closeModal(val) {
  val.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}


//открытие формы для редакирования профиля
function openEditPopup() {
  openModal(popup);

  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;

  const event = new Event('input');
  fieldName.dispatchEvent(event);
  fieldAbout.dispatchEvent(event);
}


//изменение информации профиля через форму
const handleEditFormSubmit = function (submitEvt) {
  submitEvt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;

  closeModal(popup);
}


// //добавление карточки
function renderCard(listContainerElement, one) {
  const card = new Card(listContainerElement, one);
  const cardElement = card.generateCard();
  cardsContainer .prepend(cardElement);
}

initialCards.reverse().forEach((item) => {
  renderCard(item, '#cards_template');
});


//добавление новой карточки на страницу через форму
function handleAddFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const item = {
    name: fieldTitle.value,
    link: fieldImage.value
  }

  renderCard(item, '#cards_template');
  closeModal(popupAdd);
}


//закрытие модального окна кликом на оверлей
const closePopupByClickOnOverlay = function(event) {
  if (event.target != event.currentTarget) {
    return
  }
  closeModal(event.target);
}


//закрытие модального окна на Esc
const closePopupByClickOnEsc = function(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closeModal(popupOpened);
  }
}


//Внизу файла реализуем добавление обработчиков
popupEditButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', () => openModal(popupAdd));

closeButtonEdit.addEventListener('click', () => closeModal(popup));
closeButton.addEventListener('click', () => closeModal(popupAdd));
closeButtonImg.addEventListener('click', () => closeModal(popupImg));

popupEditForm.addEventListener('submit', handleEditFormSubmit);

popupForm.addEventListener('submit', handleAddFormSubmit);

popup.addEventListener('click', closePopupByClickOnOverlay);
popupAdd.addEventListener('click', closePopupByClickOnOverlay);
popupImg.addEventListener('click', closePopupByClickOnOverlay);



const formEditValidator = new FormValidator(allClasses.formEditSelector, allClasses);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(allClasses.formAddSelector, allClasses);
formAddValidator.enableValidation();


