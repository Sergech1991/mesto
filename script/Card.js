import {openModal, popupImg, scaleText, scaleImg} from './index.js';

export default class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._template).content.querySelector('.cards__item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.cards__photo').src = this._link;
    this._element.querySelector('.cards__text').textContent = this._name;

    return this._element;
  }

  //лайки на карточку
  _clickLike() {
    this._element.querySelector('.cards__like').classList.toggle('cards__like_active');
  };

  // удаление карточки
  _deleteCard() {
    this._element.remove();
  }

// открытие попапа с картинкой
  _scalePhoto() {
    openModal(popupImg);
    scaleImg.src = this._link;
    scaleImg.alt = this._alt;
    scaleText.textContent = this._title;
  }

  _setEventListeners() {
    this._element.querySelector('.cards__like').addEventListener('click', () => {
      this._clickLike();
    });

    this._element.querySelector('.cards__delete').addEventListener('click', () => {
      this._deleteCard();
    });

    this._element.querySelector('.cards__photo').addEventListener('click', () => {
      this._scalePhoto();
    });
  }

};


