const popup = document.getElementById('popup');
const popupEditButton = document.querySelector('.profile__edit-btn');
const closeButtonEdit = popup.querySelector('.popup__close-btn');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const popupEditForm = popup.querySelector('.popup__form');
const fieldName = popup.querySelector('.popup__field-name');
const fieldAbout = popup.querySelector('.popup__field-about');
const popupBtn = popupEditForm.querySelector('.popup__btn');

const addButton = document.querySelector('.profile__add-btn');
const popupAdd = document.getElementById('popup-add');
const closeButton = popupAdd.querySelector('.popup__close-btn');
const cardsContainer = document.querySelector('.cards');//это контейнер для карточек

const popupForm = document.querySelector('.popup__form-add');
const fieldTitle = popupAdd.querySelector('.popup__field-title');
const fieldImage = popupAdd.querySelector('.popup__field-image');
const cardsTemplate = document.getElementById('cards_template').content;

const popupImg = document.getElementById('popup-image');
const scaleImg = popupImg.querySelector('.popup-image__scale-photo');
const scaleText = popupImg.querySelector('.popup-image__text');
const closeButtonImg = popupImg.querySelector('.popup__close-btn');


//открытие модального окна
function openModal(val) {
  val.classList.add('popup_opened');
}


//закрытие модального окна
function closeModal(val) {
  val.classList.remove('popup_opened');
}


// удаление карточки
function deleteCard(evt) {
  evt.target.parentNode.remove();
}


//лайки на карточку
function clickLike(evt) {
  evt.target.classList.toggle('cards__like_active');
}



//открытие формы для редакирования профиля
popupEditButton.addEventListener('click', () => {
  openModal(popup);

  popupBtn.classList.remove('popup__btn_inactive');
  popupBtn.removeAttribute('disabled');

  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
});

//изменение информации профиля через форму
const handleEditFormSubmit = function (submitEvt) {
  submitEvt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;

  closeModal(popup);
}


// создание карточки
function createCard(item) {
  const cardsElement = cardsTemplate.cloneNode(true);

  const cardsElementPhoto = cardsElement.querySelector('.cards__photo');
  const cardsElementText = cardsElement.querySelector('.cards__text');

  cardsElementPhoto.src = item.link;
  cardsElementPhoto.title = item.name;
  cardsElementText.textContent = item.name;
  cardsElementText.alt = item.name;

  cardsElement.querySelector('.cards__like').addEventListener('click', clickLike);
  cardsElement.querySelector('.cards__delete').addEventListener('click', deleteCard);
  cardsElementPhoto.addEventListener('click', scalePhoto);

  return cardsElement;
}


//добавление карточки
function renderCard(listContainerElement, cardElement) {
  listContainerElement.prepend(cardElement);
}


initialCards.reverse().forEach((item) => {
  renderCard(cardsContainer, createCard(item));
});


//добавление новой карточки на страницу через форму
function handleAddFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const item = {
    name: fieldTitle.value,
    link: fieldImage.value
  }

  renderCard(cardsContainer, createCard(item));
  popupForm.reset();
  closeModal(popupAdd);
}


//открытие попапа с картинкой
function scalePhoto(evt) {
  openModal(popupImg);
  scaleImg.src = evt.target.src;
  scaleImg.alt = evt.target.alt;
  scaleText.textContent = evt.target.title;
}


//закрытие модального окна кликом на оверлей
const popupCloseByCkickOnOverlay = function(event) {
  if (event.target != event.currentTarget) {
    return
  }
  closeModal(popup);
  closeModal(popupAdd);
  closeModal(popupImg);
}


//закрытие модального окна на Esc
const popupCloseByCkickOnEsc = function(evt) {
  if (evt.keyCode === 27) {
    closeModal(popup);
    closeModal(popupAdd);
    closeModal(popupImg);
  }
}



//Внизу файла реализуем добавление обработчиков
addButton.addEventListener('click', () => openModal(popupAdd));

closeButtonEdit.addEventListener('click', () => closeModal(popup));
closeButton.addEventListener('click', () => closeModal(popupAdd));
closeButtonImg.addEventListener('click', () => closeModal(popupImg));

popupEditForm.addEventListener('submit', handleEditFormSubmit);

popupForm.addEventListener('submit', handleAddFormSubmit);

popup.addEventListener('click', popupCloseByCkickOnOverlay);
popupAdd.addEventListener('click', popupCloseByCkickOnOverlay);
popupImg.addEventListener('click', popupCloseByCkickOnOverlay);

document.addEventListener('keydown', popupCloseByCkickOnEsc);

