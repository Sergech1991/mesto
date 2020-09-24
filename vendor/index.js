const addButton = document.querySelector('.profile__add-btn');
const popupAdd = document.getElementById('popup-add');
const closeButton = popupAdd.querySelector('.popup__close-btn');
const cardsContainer = document.querySelector('.cards');//это контейнер для карточек

const popupForm = popupAdd.querySelector('.popup__form');
const fieldTitle = popupAdd.querySelector('.popup__field-title');
const fieldImage = popupAdd.querySelector('.popup__field-image');
const cardsTemplate = document.getElementById('cards_template').content;

const initialCards  = [
  {
      name: 'Карачаевск',
      link: 'https://ru.tripaggregator.com/photos/6986742.jpeg'
  },
  {
      name: 'Гора Эльбрус',
      link: 'https://pbs.twimg.com/media/CdMnilTXEAADPut.jpg'
  },
];


// добавление карточек из массива с помощью js
function render() {
  initialCards.forEach( item => {

    const cardsElement = cardsTemplate.cloneNode(true);

    cardsElement.querySelector('.cards__photo').src = item.link;
    cardsElement.querySelector('.cards__photo').title = item.name;
    cardsElement.querySelector('.cards__text').textContent = item.name;
    cardsElement.querySelector('.cards__text').alt = item.name;

    cardsContainer.append(cardsElement);
  })
}
render();




function addOpen() {
  popupAdd.classList.add('popup_opened');
}

addButton.addEventListener('click', addOpen);

function addClose() {
  popupAdd.classList.remove('popup_opened');
}

closeButton.addEventListener('click', addClose);





function addCard(imgUrl, text) {
  const cardsTemplate = document.getElementById('cards_template').content;
  const cardElement = cardsTemplate.cloneNode(true);

  cardElement.querySelector('.cards__photo').src = imgUrl.value;
  cardElement.querySelector('.cards__text').textContent = text.value;

  cardsContainer.append(cardElement);
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  addCard(imgUrl, text);

  addClose();
}
popupForm.addEventListener('submit', formSubmitHandler);

