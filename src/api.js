import { sanitize } from './helpers.js';

export const commentsURL = 'https://wedev-api.sky.pro/api/v2/OlegGorin/comments';
const loginURL = 'https://wedev-api.sky.pro/api/user/login';
const userURL = 'https://wedev-api.sky.pro/api/user';

export let token; // 16.04.24
export const setToken = (newToken) => {
  token = newToken;
};
export let name;
export const setName = (newName) => {
  name = newName;
};

export const getComments = () => {
  return fetch(commentsURL, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Нет авторизации');
    } else if (response.status === 500) {
      throw new Error('Сервер недоступен');
    } else if (response.status === 201 || response.status === 200) {
      return response.json();
    }
  });
};

export const postComments = ({
  // token,
  nameInputElement,
  commentInputElement,
}) => {
  return fetch(commentsURL, {
    method: 'POST',
    body: JSON.stringify({
      name: sanitize(nameInputElement.value),
      text: sanitize(commentInputElement.value)
        .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
        .replaceAll('QUOTE_END', '</div>'),
      forceError: true,
    }),
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер недоступен');
    } else if (response.status === 400) {
      throw new Error('Неправильный запрос');
    } else if (response.status === 401) {
      throw new Error('Нет авторизации');
    } else {
      return response.json();
    }
  });
};

export const deleteComment = ({ commentId }) => {
  return fetch(`${commentsURL}/${commentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Нет авторизации');
    } else if (response.status === 404) {
      throw new Error('Страница недоступна');
    } else if (response.status === 500) {
      throw new Error('Сервер недоступен');
    } else if (response.status === 201 || response.status === 200) {
      return response.json();
    }
  });
};

export const toggleLike = ({ id }) => {
  return fetch(`${commentsURL}/${id}/toggle-like`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Нет авторизации');
    } else if (response.status === 404) {
      throw new Error('Страница недоступна');
    } else if (response.status === 500) {
      throw new Error('Сервер недоступен');
    } else if (response.status === 201 || response.status === 200) {
      return response.json();
    }
  });
};

export const loginUser = ({ login, password }) => {
  return fetch(loginURL, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер недоступен');
    } else if (response.status === 400) {
      throw new Error('Нет авторизации');
    } else {
      return response.json();
    }
  });
};

export const regUser = ({ login, password }) => {
  return fetch(userURL, {
    method: 'POST',
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер недоступен');
    } else if (response.status === 400) {
      throw new Error('Ошибка авторизации');
    } else {
      return response.json();
    }
  });
};
