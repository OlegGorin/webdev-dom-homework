import { safeCode, formatDate } from "./helpers.js";

const commentsURL = "https://wedev-api.sky.pro/api/v1/OlegGorin/comments";
const loginURL = "https://wedev-api.sky.pro/api/user/login";
const userURL = "https://wedev-api.sky.pro/api/user";

export let token;
export const setToken = (newToken) => {
  token = newToken;
};
export let name;
export const setName = (newName) => {
  name = newName;
};

export const getComments = () => {
  return fetch(commentsURL, {
    method: "GET",
    headers: {
      Autorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error("Нет авторизации");
    } else if (response.status === 500) {
      throw new Error("Сервер недоступен");
    } else if (response.status === 201 || response.status === 200) {
    // } else {
      return response.json();
    }
  });
};

export const postComments = ({
  token,
  nameInputElement,
  commentInputElement,
}) => {
  return fetch(commentsURL, {
    method: "POST",
    headers: {
      Autorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: safeCode(nameInputElement.value),
      text: safeCode(commentInputElement.value)
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
      forceError: true,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер недоступен");
    } else if (response.status === 400) {
      throw new Error("Неправильный запрос");
    } else {
      return response.json();
    }
  });
};

export const loginUser = ({ login, password }) => {
  return fetch(loginURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер недоступен");
    } else if (response.status === 400) {
      throw new Error("Нет авторизации");
    } else {
      return response.json();
    }
  });
};

export const regUser = ({ login, password, name }) => {
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
    }),
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер недоступен");
    } else if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    } else {
      return response.json();
    }
  });
};