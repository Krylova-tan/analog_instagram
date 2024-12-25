import '../pages/index.css';
import { initialCards } from './cards.js';
import {openPopup, closePopup} from './modal.js';
import {createCard, likeCard, deleteCard} from './card.js';

const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.places__list');

// добавление в контейнер
function addCards() { 
  initialCards.forEach(({ name, link }) => {
    const card = createCard({name, link}, deleteCard, likeCard, openPopupImage);
    cardsContainer.append(card);
  });
}

addCards();

const buttonEdit = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const buttonAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup_type_new-card');
const buttonCloseList = document.querySelectorAll('.popup__close');
const popupImage = document.querySelector('.popup_type_image');
const popupDetalisImage = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

buttonAdd.addEventListener('click', () => openPopup(popupAdd));
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

// функционал редактирование полей
const formEdit = popupEdit.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const titleProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');

function changeInputFormEdit() {
  nameInput.value = titleProfile.textContent;            
  jobInput.value = descriptionProfile.textContent;
}

function editFormInfoProfile(evt) {  
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  titleProfile.textContent = nameValue;
  descriptionProfile.textContent = jobValue;

  closePopup(popupEdit);
}

formEdit.addEventListener('submit', editFormInfoProfile);

// добавление новой карточки
const formAdd = popupAdd.querySelector('.popup__form');
const nameInputFormEdit = popupAdd.querySelector('.popup__input_type_card-name');
const linkInputFormEdit = popupAdd.querySelector('.popup__input_type_url');

function createNewCard(evt) {
  evt.preventDefault();

  const nameNewCard = nameInputFormEdit.value;
  const linkNewCard = linkInputFormEdit.value;

  const newCardAllDate = createCard({ name: nameNewCard, link: linkNewCard }, deleteCard, likeCard, openPopupImage);

  cardsContainer.prepend(newCardAllDate);

  closePopup(popupAdd);
  formAdd.reset();
}

formAdd.addEventListener('submit', createNewCard);

// открытие картинки
function openPopupImage(link, name) {
  popupDetalisImage.src = link;
  popupDetalisImage.alt = name;
  popupImageCaption.textContent = name;

  openPopup(popupImage);
}

