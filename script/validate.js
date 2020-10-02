const listNameObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn',
  inactiveButtonClass: 'popup__btn_inactive',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};

//показываем элемент ошибки
function showInputError(formElement, inputElement, errorMessage, allClasses) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(allClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(allClasses.errorClass);
};

//скрываем элемент ошибки
function hideInputError (formElement, inputElement, allClasses) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(allClasses.inputErrorClass);
  errorElement.classList.remove(allClasses.errorClass);
  errorElement.textContent = '';
};


//проверяем валидность поля
function isValid(formElement, inputElement, allClasses) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, allClasses);
  }
  else {
    hideInputError(formElement, inputElement, allClasses);
  }
};


//добавляем слушатель событий всем полям ввода внутри формы
function setEventListener(formElement, allClasses) {
  const inputList = Array.from(formElement.querySelectorAll(allClasses.inputSelector));
  const buttonElement = formElement.querySelector(allClasses.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, allClasses);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, allClasses);

      toggleButtonState(inputList, buttonElement, allClasses);
    })
  })
};


//проверяем наличие невалидного поля в форме
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


//смена состояния кнопки button(type="submit")
function toggleButtonState(inputList, buttonElement, allClasses) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(allClasses.inactiveButtonClass);
    buttonElement.setAttribute('disabled' , true);
  }
  else {
    buttonElement.classList.remove(allClasses.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}


//включаем валидацию всех форм
function enableValidation(allClasses) {
  const formList = Array.from(document.querySelectorAll(allClasses.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    })
    setEventListener(formElement, allClasses);
  })
}


enableValidation(listNameObject);




