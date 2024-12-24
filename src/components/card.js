// создание карточки
function createCard({ name, link }, deleteCard, likeCard, openPopupImage) { 
  const cardContent = document.querySelector('#card-template').content;
  const cardElement = cardContent.querySelector('.places__item').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  
  buttonDelete.addEventListener('click', () => deleteCard(cardElement));
  buttonLikeCard.addEventListener('click', likeCard);
  cardImage.addEventListener('click', () => openPopupImage(link, name));
  
  return cardElement;
}

// удаление карточки
function deleteCard(cardElement){ 
  cardElement.remove();
}

// лайк по карточке
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) { 
    evt.target.classList.toggle('card__like-button_is-active');
  }
};

export {createCard, deleteCard, likeCard};