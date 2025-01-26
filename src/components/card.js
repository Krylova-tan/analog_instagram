// создание карточки
function createCard({ name, link, likes, ownerId, _id, userId }, addLike, deleteLike, deleteCardApi, openPopupImage) { 
  const cardContent = document.querySelector('#card-template').content;
  const cardElement = cardContent.querySelector('.places__item').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  const buttonLikeCard = cardElement.querySelector('.card__like-button');

  const cardImage = cardElement.querySelector('.card__image');
  const cardLikesCounter = cardElement.querySelector('.card__likes-counter');
 
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.card__title').textContent = name;
  cardLikesCounter.textContent = likes.length;
  cardElement.dataset.cardId = _id;

  if (ownerId == userId){
    buttonDelete.addEventListener('click', () => {
      const cardElementdId = cardElement.dataset.cardId;

      deleteCardApi(cardElementdId)
          .then(() => {
            cardElement.remove();
          })
          .catch((err) => {
              console.log(err);
          })
    });    
    buttonDelete.style.display = 'block';
  } else {
    buttonDelete.style.display = 'none';
  }
  
  // проверка на лайк
  const doLike = likes.some(like => like._id == userId);
  if (doLike) {
    buttonLikeCard.classList.add('card__like-button_is-active');
  }

  buttonLikeCard.addEventListener('click', () => {
    if (buttonLikeCard.classList.contains('card__like-button_is-active')) {
      deleteLike(_id)
        .then((data) => {
          buttonLikeCard.classList.remove('card__like-button_is-active');
          cardLikesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
      addLike(_id)
        .then((data) => {
          buttonLikeCard.classList.add('card__like-button_is-active');
          cardLikesCounter.textContent = data.likes.length;
        })
        .catch((err) => {
              console.log(err);
        });
    }    
  });

  cardImage.addEventListener('click', openPopupImage);
  
  return cardElement;
};

export {createCard};