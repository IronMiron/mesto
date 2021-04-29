export default class Api {
    constructor({ baseUrl, token }) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    _fetch({ path, method = 'GET', mime = 'application/json; charset=utf-8', body }) {
        return fetch(`${this.baseUrl + path}`, {
            method: method,
            headers: {
                authorization: this.token,
                "Content-Type": mime,
            },
            body: JSON.stringify(body),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    getUser() {
        return this._fetch({
            path: 'users/me',
        })
    }

    getInitialCards() {
        return this._fetch({
            path: 'cards',
        })
    }

    updateUser({name, about}) {
        return this._fetch({
            path: 'users/me',
            method: 'PATCH',
            body: {
                name: name,
                about: about,
            },
        })
    }

    insertCard({name, link}) {
        return this._fetch({
            path: 'cards',
            method: 'POST',
            body: {
                name: name,
                link: link,
            },
        })
    }

    deleteCard(cardId) {
        return this._fetch({
            path: `cards/${cardId}`,
            method: 'DELETE',
        })
    }

    likeCard(cardId, isLiked) {
        const method = (isLiked) ? 'DELETE' : 'PUT';
        return this._fetch({
            path: `cards/likes/${cardId}`,
            method: method,
        })
    }

    updateAvatar(avatarLink) {
        return this._fetch({
            path: 'users/me/avatar',
            method: 'PATCH',
            body: {
                avatar: avatarLink,
            }
        })
    }
}