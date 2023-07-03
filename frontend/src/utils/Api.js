const apiParams = {
    link: 'https://mesto.nomoreparties.co/v1/cohort-62/',
    headers: {
        authorization: 'e055b3b1-f0a3-420f-954c-707ea8c5fb7b',
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
            {headers: this._headers}
        );
    }

    //Сбор информации о карточках
    getCardFromServer() {
        return this._request(
            `${this._link}cards`, 
            {headers: this._headers}
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
                headers: this._headers
            }
        );
    }

    //Удаление карточки с сервера
    deleteCardFromServer(cardId) {
        return this._request(
            `${this._link}cards/${cardId}`, 
            {
                method: 'DELETE',
                headers: this._headers
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
                    about: data.about
                }),
                headers: this._headers
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
                headers: this._headers
        
            }
        );
    }

    handleChangeAvatar(newAvatarLink) {
        return this._request(
            `${this._link}/users/me/avatar`, 
            {
                method: 'PATCH',
                body: JSON.stringify(newAvatarLink),
                headers: this._headers
            }
        );
    }
}

export const api = new Api(apiParams);