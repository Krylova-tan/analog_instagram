// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const templateCard = container.querySelector('.places__list');

function addCard() { // для добавления на сайт
  initialCards.forEach(({ name, link }) => {
    const card = createCard({name, link}, deleteCard);
    templateCard.append(card);
  });
}

function createCard({ name, link }, deleteCard) { // для создания карточки
  const cardContent = document.querySelector('#card-template').content;
  const cardElement = cardContent.querySelector('.places__item').cloneNode(true);
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;

  buttonDelete.addEventListener("click", () => deleteCard(cardElement));

  return cardElement;
}

function deleteCard(cardElement){ // для удаления карточки
  cardElement.remove();
}

addCard();
