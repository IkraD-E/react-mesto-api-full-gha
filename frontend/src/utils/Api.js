const apiParams = {
    // link: 'https://ikrad.nomoreparties.sbs/',
    link: 'http://localhost:3001/',
    headers: {
        // authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
        'Content-Type': 'application/json'
    }
}

class Api{
    constructor({link, headers}){
        this._link = link;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json()
        }
            return Promise.reject(res)
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    //Сбор информации о пользователе
    getUserDataFromServer() {
        return this._request(
            `${this._link}users/me`,
            {
                method: 'GET',
                headers: this._headers,
                credentials: 'include',
            }
        );
    }

    //Сбор информации о карточках
    getCardFromServer() {
        return this._request(
            `${this._link}cards`,
            {
                method: 'GET',
                headers: this._headers,
                credentials: 'include',
            }
        );
    }

    //Добавление карточки на сервер
    addNewPlaceToServer({name, link}) {
        return this._request(
            `${this._link}cards`,
            {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    link: link
                }),
                headers: this._headers,
                credentials: 'include',
            }
        );
    }

    //Удаление карточки с сервера
    deleteCardFromServer(cardId) {
        return this._request(
            `${this._link}cards/${cardId}`,
            {
                method: 'DELETE',
                headers: this._headers,
                credentials: 'include',
            }
        );
    }

    //Изменить данные о пользователе на сервере
    setUserInfo(data) {
        return this._request(
            `${this._link}users/me`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    name: data.name,
                    about: data.about,
                }),
                headers: this._headers,
                credentials: 'include',
            }
        );
    }

    //Добавить лайк на сервер
    //Убрать лайк с сервера
    changeLikeCardStatus(cardId, isLiked) {
        return this._request(
            `${this._link}cards/${cardId}/likes`,
            {
                method: isLiked ? 'DELETE' : 'PUT',
                headers: this._headers,
                credentials: 'include',
            }
        );
    }

    handleChangeAvatar(newAvatarLink) {
        return this._request(
            `${this._link}users/me/avatar`,
            {
                method: 'PATCH',
                body: JSON.stringify(newAvatarLink),
                headers: this._headers,
                credentials: 'include',
            }
        );
    }
}

export const api = new Api(apiParams);