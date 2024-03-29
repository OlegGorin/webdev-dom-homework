import { safeCode, formatDate, clearInput } from "./appfunc.js";
import { nameInputElement, commentInputElement } from "./main.js";

export const getComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/OlegGorin/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 201 || response.status === 200) {
      return response.json();
    } else if (response.status === 500) {
      return Promise.reject(new Error("Сервер недоступен"));
    }
    // return response.json();
  });
};

export const postComments = () => {
  return fetch("https://wedev-api.sky.pro/api/v1/OlegGorin/comments", {
    method: "POST",
    body: JSON.stringify({
      name: safeCode(nameInputElement.value),
      text: safeCode(commentInputElement.value)
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
      forceError: true,
    }),
  });
};