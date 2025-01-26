import '../pages/index.css';
import { openPopup, closePopup } from './modal.js';
import { createCard } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInfoUser, getCards, updateDataProfile, addNewCard, deleteCardApi, addLike, deleteLike, updateAvatarUser } from './api.js';
import { Promise } from 'core-js';

// валидация
const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// включение валидации
enableValidation(validationSetting);

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonCloseList = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup_type_image');
const popupDetalisImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

buttonAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  clearValidation(formAdd, validationSetting);
});
   
buttonEdit.addEventListener('click', () => {
  changeInputFormEdit();
  openPopup(popupEdit);
});

buttonCloseList.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

// редактирование полей
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

function changeInputFormEdit() {
  nameInput.value = titleProfile.textContent;            
  jobInput.value = descriptionProfile.textContent;
  clearValidation(formEdit, validationSetting);
};

// форма редактирования профиля
formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  const popupEdit = document.querySelector('.popup_type_edit');
  const buttonPopup = popupEdit.querySelector('.popup__button');
  buttonPopup.textContent = "Сохранение...";
  buttonPopup.disabled = true;

  updateDataProfile(nameValue, jobValue)
    .then((data) => {
      titleProfile.textContent = data.name;
      descriptionProfile.textContent = data.about;

      closePopup(popupEdit);

      nameInput.value = "";
      jobInput.value = "";
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonPopup.textContent = "Сохранить";
      buttonPopup.disabled = false; 
    })
});

let userId = null; // для изменения значения

// данные пользователя и карт
const getData = () => {
  Promise.all([getInfoUser(), getCards()])
    .then(([userData, cardData]) => {
      titleProfile.textContent = userData.name; // запись новых данных
      descriptionProfile.textContent = userData.about;

      const avatarProfile = document.querySelector('.profile__image');
      avatarProfile.style.backgroundImage = `url(${userData.avatar})`;

      userId = userData._id;

    // обработка карточек
      const container = document.querySelector('.content');
      const cardsContainer = container.querySelector('.places__list');

      cardData.forEach((card) => {
        const newCard = createCard({name: card.name, link: card.link, likes: card.likes, _id: card._id, ownerId: card.owner._id, userId: userId},
        addLike, deleteLike, deleteCardApi, openPopupImage);
        cardsContainer.append(newCard);
      })
    })
    .catch((err) => {
    console.log(err);
    })
};

getData(); // вызов получения и обработки данных юзера и карт

// добавление новой карточки + апи
const formAdd = popupAdd.querySelector('.popup__form');
const nameInputFormEdit = popupAdd.querySelector('.popup__input_type_card-name');
const linkInputFormEdit = popupAdd.querySelector('.popup__input_type_url');

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const nameNewCard = nameInputFormEdit.value;
  const linkNewCard = linkInputFormEdit.value;

  const popupAdd = document.querySelector('.popup_type_new-card');
  const buttonAdd = popupAdd.querySelector('.popup__button');
  buttonAdd.textContent = 'Сохранение...';
  buttonAdd.disabled = true;

  addNewCard(nameNewCard, linkNewCard)
    .then((data) => {
      const newCardAllDate = createCard({ name: data.name, link: data.link, likes: data.likes, ownerId: data.owner._id, _id: data._id, userId}, addLike, deleteLike, deleteCardApi, openPopupImage);

      const container = document.querySelector('.content');
      const cardsContainer = container.querySelector('.places__list');
      cardsContainer.prepend(newCardAllDate);

      closePopup(popupAdd);

      formAdd.reset();

      clearValidation(formAdd, validationSetting);
    })
    .catch((err) => {
      console.log(err); 
    })
    .finally(() => {
    buttonAdd.textContent = 'Сохранить';
    buttonAdd.disabled = false;
    });
});

// открытие картинки
function openPopupImage(evt) {
  const imgageElement = evt.target;

  const imgageElementLink = imgageElement.src;
  const imgageElementDescr = imgageElement.alt;

  popupDetalisImage.src = imgageElementLink;
  popupDetalisImage.alt = imgageElementDescr;
  popupImageCaption.textContent = imgageElementDescr;

  openPopup(popupImage);
};

// изменение аватара
const popupUpdateAvatar = document.querySelector('.popup_type_avatar');
const formUpdateAvatar = popupUpdateAvatar.querySelector('.popup__form');
const profileAvatarImg = document.querySelector('.profile__image');

formUpdateAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const urlAvatar = document.getElementById('avatar-input').value;

    if(urlAvatar) {
      const popupUpdateAvatar = document.querySelector('.popup_type_avatar');
      const buttonPopup = popupUpdateAvatar.querySelector('.popup__button');
      buttonPopup.textContent = 'Сохранение...';
      buttonPopup.disabled = true;

      updateAvatarUser(urlAvatar)
        .then((data) => {
          document.querySelector('.profile__image').src = data.avatar;

          closePopup(popupUpdateAvatar);
          formUpdateAvatar.reset();
        })
        .catch(err => {
          console.log('Возникла ошибка:', err);
          buttonPopup.disabled = false;
        })
        .finally(() => {
          buttonPopup.textContent = 'Сохранить';
          buttonPopup.disabled = false;
        });
    } else {
      console.log('Пожалуйста, укажите верный URL изображения');
    }
});

// открытие обновления аватара
profileAvatarImg.addEventListener('click', () => {
  openPopup(popupUpdateAvatar);
  clearValidation(formUpdateAvatar, validationSetting);
});



