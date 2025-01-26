// включение валидации всех форм
function enableValidation(validationSetting) {
  const formList = Array.from(document.querySelectorAll(validationSetting.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('input', (evt) => {
      const inputElement = evt.target;
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

      if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
      } else {
        inputElement.setCustomValidity("");
      };

      if (inputElement.validity.valid) {
        toggleButtonState(formElement, validationSetting);
        hideInputError(inputElement, errorElement, validationSetting);
      } else {
        showInputError(inputElement, errorElement, validationSetting);
        toggleButtonState(formElement, validationSetting);
      }
    });
  });
};

// показ ошибки
const showInputError = (inputElement, errorElement, validationSetting) => {
  inputElement.classList.add(validationSetting.inputErrorClass);
  errorElement.classList.add(validationSetting.errorClass);
  errorElement.textContent = inputElement.validationMessage;
};

// cкрытие ощибки
const hideInputError = (inputElement, errorElement, validationSetting) => {
  inputElement.classList.remove(validationSetting.inputErrorClass);
  errorElement.classList.remove(validationSetting.errorClass);
  errorElement.textContent = " ";
};

// проверка на валидность полей
const testValid = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
};

// очистка ошибок валидации
function clearValidation(formElement, validationSetting){
  const inputList = Array.from(formElement.querySelectorAll(validationSetting.inputSelector));

  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    hideInputError(errorElement, inputElement, validationSetting);
  });
  toggleButtonState(formElement, validationSetting);
};

// переключение кнопки
  function toggleButtonState(formElement, validationSetting){
  const inputList = Array.from(formElement.querySelectorAll(validationSetting.inputSelector));
  const buttonElement = formElement.querySelector(validationSetting.submitButtonSelector);

  if(testValid(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSetting.inactiveButtonClass);
    } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSetting.inactiveButtonClass);
    }
};

export {enableValidation, clearValidation};