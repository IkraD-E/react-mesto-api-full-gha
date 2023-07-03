const apiParams = {
    link: 'https://auth.nomoreparties.co/',
    headers: {
        'Content-Type': 'application/json'
    }
}

class Auth{
    constructor({link, headers}){
        this._link = link;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res
        }
            return Promise.reject(res)
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    //Сбор информации о пользователе
    checkToken(jwt) {
        return this._request(
            `${this._link}users/me`, 
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json',
                    "Authorization" : `Bearer ${jwt}`}}
        );
    }

    //Добавление пользователя на сервер
    addNewUserToServer(email, password) {
        return this._request(
            `${this._link}signup`, 
            {
                method: 'POST',
                body: JSON.stringify({
                    "password": password,
                    "email": email
                }),
                headers: this._headers
            }
        );
    }

    //Аутентификация пользователя на сервере
    handleUserAuthorization(email, password) {
        return this._request(
            `${this._link}signin`, 
            {
                method: 'POST',
                body: JSON.stringify({
                    "password": password,
                    "email": email
                }),
                headers: this._headers
            }
        );
    }

}

export const auth = new Auth(apiParams);