import {allClasses} from './index.js';

export default class FormValidator {
  constructor(allClasses, formSelector) {
    this._formSelector = allClasses.formSelector;
    this._allClasses = allClasses;
    this._formElement = document.querySelector(formSelector);
    this._inputSelector = allClasses.inputSelector;
    this._submitButtonSelector = allClasses.submitButtonSelector;
    this._inactiveButtonClass = allClasses.inactiveButtonClass;
    this._inputErrorClass = allClasses.inputErrorClass;
    this._errorClass = allClasses.errorClass;
  }

//показываем элемент ошибки
_showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(this._allClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._allClasses.errorClass);
};

//скрываем элемент ошибки
_hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(allClasses.inputErrorClass);
  errorElement.classList.remove(allClasses.errorClass);
  errorElement.textContent = '';
};


//проверяем валидность поля
_isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(formElement, inputElement, inputElement.validationMessage);
  }
  else {
    this._hideInputError(formElement, inputElement);
  }
};


//проверяем наличие невалидного поля в форме
_hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


//смена состояния кнопки button(type="submit")
_toggleButtonState(inputList, buttonElement) {
  if (this._hasInvalidInput(inputList)) {
    buttonElement.classList.add(this._allClasses.inactiveButtonClass);
    buttonElement.setAttribute('disabled' , true);
  }
  else {
    buttonElement.classList.remove(this._allClasses.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}


//добавляем слушатель событий всем полям ввода внутри формы
_setEventListener(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(this._allClasses.inputSelector));
  const buttonElement = formElement.querySelector(this._allClasses.submitButtonSelector);

  this._toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._isValid(formElement, inputElement);

      this._toggleButtonState(inputList, buttonElement);
    })
  })
};


//включаем валидацию всех форм
enableValidation = () => {

    this._formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    })
    this._setEventListener(this._formElement);
  }

}
