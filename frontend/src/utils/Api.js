class Api {
    // constructor({address, token, headers}) {
    constructor({address, headers}) {
        this._address = address;
        // this._token = token;
        this._headers = headers
    }

//обработчик ответа
    _getResponse(res) {
        if (res.ok) {
            return res.json();//разбирает ответ как JSON;
        }
        return Promise.reject(`Error ${res.status}`);
    }

    // получение данных профиля с сервера
    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: this._headers,
        }).then(this._getResponse);
    }

//метод получения карточек с сервера

    getInitialCards() {
        return fetch(`${this._address}/cards`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._getResponse)
    }

    // добавление карточки
    postNewCard(item) {
        return fetch(`${this._address}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: item.name,
                link: item.link,
            }),
        }).then(this._getResponse);
    }

    // поменять аватар
    patchNewAvatar(item) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: item.avatar,
            }),
        }).then(this._getResponse);
    }

    // редактирование профиля
    patchUserProfile(item) {
        return fetch(`${this._address}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({name: item.name, about: item.about}),
        }).then(this._getResponse);
    }

    // удаление карточки
    deleteCard(id) {
        return fetch(`${this._address}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        }).then(this._getResponse);
    }

    changeLikeCardStatus(id, wasLiked) {
        return fetch(`${this._address}/cards/${id}/likes`, {
            method: wasLiked? "DELETE" : "PUT",
            headers: this._headers,
        }).then(this._getResponse);
    }
}

const api = new Api({
    //for localhost workflow
    //    address: 'http://localhost:3000',
    address: 'https://api.domainname.kmariasha.nomoredomains.sbs',
    headers: {
        "Content-Type":
            "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`,
       // 'Access-Control-Allow-Origin': '*',
    }
});

export default api;
