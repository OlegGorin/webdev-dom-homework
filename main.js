import { getComments, postComments } from "./api.js";
import {
  safeCode,
  formatDate,
  clearInput,
  prepareInput,
  delay,
  commentsLoadActive,
  commentsLoadHide,
  commentsAddActive,
  commentsAddHide,
  addFormActive,
  addFormHide,
  addButtonActive,
  addButtonNonActive,
} from "./helpers.js";
import { initEventListeners, changeLikeButton } from "./listeners.js";
import { renderComments } from "./render.js";

export let userComments = [];

export const listElement = document.querySelector(".comments");
export const addButtonElement = document.querySelector(".add-form-button");
export const nameInputElement = document.querySelector(".add-form-name");
export const commentInputElement = document.querySelector(".add-form-text");
export const deleteButtonElement = document.querySelector(".del-form-button");
export const commentsLoading = document.querySelector(".loading");
export const commentsAdding = document.querySelector(".adding");
export const addForm = document.querySelector(".add-form");

commentsLoadActive();
commentsAddHide();
addFormActive();

function fetchPromiseArr() {
  getComments()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: formatDate(comment.date),
          text: comment.text,
          likesCounter: comment.likes,
          likeButton: false,
        };
      });

      commentsLoadHide(); // скрываем надпись о загрузке комментариев с сервера
      commentsAddHide(); // скрываем надпись о добавлении записей на сервер
      addFormActive(); // активируем форму добавления комментариев, активируем кнопку "Удалить последний комментарий"

      userComments = appComments;
      renderComments();
      prepareInput();
    })
    .catch((error) => {
      if (error.message === "Сервер недоступен") {
        alert("Сервер недоступен, попробуйте позже");
        fetchPromiseArr();
      } else if (error.message === "Failed to fetch") {
        alert("Неполадки интернета");
        addButtonNonActive(); // деактивируем кнопку "Написать",  меняем ее цвет
        commentsAddHide(); // скрываем надпись о добавлении записей на сервер
        addFormActive(); // активируем форму добавления комментариев
      } else {
        console.log(error);
      }
      console.warn(error);
    });
}

fetchPromiseArr();

changeLikeButton();
clearInput();

addButtonElement.disabled = true;
addButtonElement.classList.add("error");

nameInputElement.addEventListener("input", (event) => {
  addButtonActive();
});

commentInputElement.addEventListener("input", (event) => {
  addButtonActive();
});

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addListComment();
  }
});

deleteButtonElement.addEventListener("click", (event) => {
  userComments.splice(userComments.length - 1, 1);
  renderComments();
  prepareInput();
  clearInput();
  event.stopPropagation();
});

// deleteButtonElement.addEventListener("click", (event) => {
//   event.stopPropagation();

//   const id = deleteButtonElement.dataset.id;

//   fetch("https://wedev-api.sky.pro/api/v1/OlegGorin/comments" + id, {
//     method: "DELETE",
//   }).then((response) => {
//     response.json().then((responseData) => {
//       console.log(responseData.comments);
//       // { result: 'ok' }
//       // comments = responseData.comments;
//       renderComments();
//     });
//   });
//   renderComments();
// });

initEventListeners();

addButtonElement.addEventListener("click", handlePostClick);

function handlePostClick() {
  if (
    nameInputElement.value.trim() === "" ||
    commentInputElement.value.trim() === ""
  ) {
    addButtonNonActive();
    return;
  }

  postComments()
    .then((response) => {
      if (response.status === 500) throw new Error("Сервер недоступен");
      if (response.status === 201 || response.status === 200) {
        fetchPromiseArr();
        // return response.json();
      }
      if (response.status === 400) throw new Error("Неправильный запрос");
    })
    // .then(() => {
    //   return fetchPromiseArr();
    // })
    .then(() => {
      clearInput();
    })
    .catch((error) => {
      if (error.message === "Сервер недоступен") {
        alert("Сервер недоступен, попробуйте позже");
        handlePostClick();

        addButtonActive();
        commentsAddHide();
        addFormActive();

        renderComments();
      } else if (error.message === "Неправильный запрос") {
        alert("Поля 'Имя' и 'Комментарий' должны содержать хотя бы 3 символа");

        commentsAddHide();
        addFormActive();

        renderComments();
        prepareInput();
      } else if (error.message === "Failed to fetch") {
        alert("Неполадки интернета");

        addButtonActive();
        commentsAddHide();
      } else {
        console.log(error);
      }
    });

  commentsAddActive();
  addFormHide();

  renderComments();
  // clearInput();
}

renderComments();
prepareInput();

console.log("It works!");
