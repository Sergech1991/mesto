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
const cardsTemplate = document.getElementById('cards_template').content;

const popupImg = document.getElementById('popup-image');
const scaleImg = popupImg.querySelector('.popup-image__scale-photo');
const scaleText = popupImg.querySelector('.popup-image__text');
const closeButtonImg = popupImg.querySelector('.popup__close-btn');

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

//открытие формы для редакирования профиля
popupEditButton.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  fieldName.value = profileName.textContent;
  fieldAbout.value = profileAbout.textContent;
});

//изменение информации профиля через форму
const formSubmitHandlerEdit = function (submitEvt) {
  submitEvt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = fieldName.value;
  profileAbout.textContent = fieldAbout.value;

  closeModal(popup);
}
popupEditForm.addEventListener('submit', formSubmitHandlerEdit);


// добавление карточек из массива с помощью js
function addCard(item) {
  const cardsElement = cardsTemplate.cloneNode(true);

  cardsElement.querySelector('.cards__photo').src = item.link;
  cardsElement.querySelector('.cards__photo').title = item.name;
  cardsElement.querySelector('.cards__text').textContent = item.name;
  cardsElement.querySelector('.cards__text').alt = item.name;

  cardsElement.querySelector('.cards__like').addEventListener('click', clickLike);
  cardsElement.querySelector('.cards__delete').addEventListener('click', deleteCard);
  cardsElement.querySelector('.cards__photo').addEventListener('click', scalePhoto);

  cardsContainer.prepend(cardsElement);
}


function render() {
  initialCards.reverse().forEach(addCard);
}
render();


//открытие модального окна
function openModal(val) {
  val.classList.add('popup_opened');
}
addButton.addEventListener('click', () => openModal(popupAdd));


//закрытие модального окна
function closeModal(val) {
  val.classList.remove('popup_opened');
}
closeButtonEdit.addEventListener('click', () => closeModal(popup));
closeButton.addEventListener('click', () => closeModal(popupAdd));
closeButtonImg.addEventListener('click', () => closeModal(popupImg));


// удаление карточки
function deleteCard(evt) {
  evt.target.parentNode.remove();
}


//лайки на карточку
function clickLike(evt) {
  evt.target.classList.toggle('cards__like_active');
}


//открытие попапа с картинкой
function scalePhoto(evt) {
  popupImg.classList.add('popup_opened');
  scaleImg.src = evt.target.src;
  scaleText.textContent = evt.target.title;
}


//добавление новой карточки на страницу через форму
function formSubmitHandlerAdd(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const item = {
    name: fieldTitle.value,
    link: fieldImage.value
  }

  addCard(item);
  popupForm.reset();
  closeModal(popupAdd);
}
popupForm.addEventListener('submit', formSubmitHandlerAdd);


//закрытие модального окна кликом на оверлей
const popupCloseByCkickOnOverlay = function(event) {
  if (event.target != event.currentTarget) {
    return
  }
  closeModal(popup);
  closeModal(popupAdd);
  closeModal(popupImg);
}
popup.addEventListener('click', popupCloseByCkickOnOverlay);
popupAdd.addEventListener('click', popupCloseByCkickOnOverlay);
popupImg.addEventListener('click', popupCloseByCkickOnOverlay);
