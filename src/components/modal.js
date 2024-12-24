// открытие попапа
function openPopup (popupElement) {
  popupElement.classList.add('popup_is-opened');
  popupElement.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

// закрытие попапа
function closePopup (activePopup) {
  activePopup.classList.remove('popup_is-opened');
  activePopup.removeEventListener('click', closeByOverlay); // удаление при закрытии
  document.removeEventListener('keydown', closeByEsc);
  activePopup.classList.add('popup_is-animated'); // плавность
}

// закрытие по оверлею
function closeByOverlay(evt){
  const popup = evt.currentTarget;
  if (evt.target === popup){
    closePopup(popup);
  }
};

// закрытие по esc
function closeByEsc(evt){
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened')
    closePopup(popup);
  }
};

export {openPopup, closePopup}; 