const configApi = {
  urlApi: 'https://nomoreparties.co/v1/wff-cohort-30',
  headers: {
      authorization: 'eaeb3257-4ec1-4f45-aa18-e3dff90f7b00',
      'Content-Type': 'application/json'
  }
};

// запрос на получение информации о пользователе
const getInfoUser = () => {
  return fetch(`${configApi.urlApi}/users/me`, {
      method: 'GET',
      headers: configApi.headers
  })
    .then((res) => { 
        if (res.ok){
              return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// запрос на получение карточек
const getCards = () => {
    return fetch(`${configApi.urlApi}/cards`, {
        method: 'GET',
        headers: configApi.headers
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// запрос на обновление данных профиля
const updateDataProfile = (name, about) => {
    return fetch(`${configApi.urlApi}/users/me`, {
        method: 'PATCH',
        headers: configApi.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })    
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// запрос на добавление новой карточки 
const addNewCard = (name, link) => {
    return fetch(`${configApi.urlApi}/cards`, {
        method: 'POST',
        headers: configApi.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })    
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }); 
};

// запрос на удаление карточки
const deleteCardApi = (cardId) => {
    return fetch(`${configApi.urlApi}/cards/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// запрос на добавление лайка
const addLike = (cardId) => {
    return fetch(`${configApi.urlApi}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: configApi.headers
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// запрос на удаление лайка
const deleteLike = (cardId) => {
    return fetch(`${configApi.urlApi}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers
    })
    .then((res) => {
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    });
};

// запрос на обновление автара пользователя
const updateAvatarUser = (avatar) => {
    return fetch(`${configApi.urlApi}/users/me/avatar`, {
        method: 'PATCH',
        headers: configApi.headers,
        body: JSON.stringify({ avatar })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
};

export {getInfoUser, getCards, updateDataProfile, addNewCard, deleteCardApi, addLike, deleteLike, updateAvatarUser};