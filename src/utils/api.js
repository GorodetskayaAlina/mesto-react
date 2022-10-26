class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //Информация о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        method: 'GET',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //загрузка аватара
  getProfileAvatar(urlAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`,
      {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar: urlAvatar
        })
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //Обновление информации о пользователе
  updateUserInfo(userName, userJob) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers,
        body: JSON.stringify({
          name: userName,
          about: userJob
        }),
        method: 'PATCH',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //загрузка начальных карточек
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        method: 'GET',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //загрузка новых карточек
  createNewCards(name, link) {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        }),
        method: 'POST',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //постановка и удаление лайка
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,
      {
        headers: this._headers,
        method: `${isLiked? 'PUT' : 'DELETE'}`,
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }

  //удаление карточки
  deleteCardItem(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`,
      {
        headers: this._headers,
        method: 'DELETE',
      })
      .then(this._checkResponse)
      .then((data) => {
        return data;
      })
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
  headers: {
    authorization: '4bb8181e-602a-4a9b-b870-9855c1bb8830',
    'Content-Type': 'application/json'
  }
});

export default api;