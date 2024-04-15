import { userComments, fetchPromiseArr, isLoading } from "./main.js";
import { initEventListeners, changeLikeButton } from "./listeners.js";
import { getListComments } from "./listComments.js";
import { postComments, token, setToken, name, setName } from "./api.js";
import {
  safeCode,
  formatDate,
  delay,
  clearInput,
  prepareInput,
  commentsLoadActive,
  commentsLoadHide,
  commentsAddActive,
  commentsAddHide,
  addFormActive,
  addFormHide,
  addButtonActive,
  addButtonNonActive,
} from "./helpers.js";
import { renderLogComment } from "./renderLogin.js";


export const renderComments = () => {
  const appElement = document.getElementById("app");

  const loadHTML = `
      <div class="container">
        ${isLoading
      ? `<p class="adding">Пожалуйста, подождите, загружаю комментарии...</p>`
      : ""
    }
      </div>`;

  appElement.innerHTML = loadHTML;

  if (!token) {
    // renderLogComment({ fetchPromiseArr, appElement });
    renderLogComment({ fetchPromiseArr });    
  } else {

    const commentHTML = userComments
      .map((comment, index) => getListComments({ userComments, index }))
      .join("");

    const appHTML = `
      <div class="container">
        <ul class="comments">
          ${commentHTML}
        </ul>
        <p class="adding">Комментарии добавляются...</p>
        <div class="add-form">
          <input type="text" class="add-form-name" value="${name}" readonly/>
          <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button class="add-form-button">Написать</button>
            <button class="del-form-button">Удалить последний комментарий</button>
          </div>
        </div>
        >
      </div>`;

    appElement.innerHTML = appHTML;

    const addForm = document.querySelector(".add-form");
    const nameInputElement = document.querySelector(".add-form-name");
    const commentInputElement = document.querySelector(".add-form-text");
    const addButtonElement = document.querySelector(".add-form-button");
    const listElement = document.querySelector(".comments");
    const deleteButtonElement = document.querySelector(".del-form-button");
    const commentsLoading = document.querySelector(".loading");
    const commentsAdding = document.querySelector(".adding");

    listElement.innerHTML = commentHTML;

    commentsAddHide({ commentsAdding });

    initEventListeners();
    changeLikeButton();

    addButtonNonActive({ addButtonElement });

    nameInputElement.disabled = true;
    nameInputElement.addEventListener("input", (event) => {
      addButtonActive({ addButtonElement });
    });

    commentInputElement.addEventListener("input", (event) => {
      addButtonActive({ addButtonElement });
    });

    document.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        handlePostClick();
      }
    });

    deleteButtonElement.addEventListener("click", (event) => {
      userComments.splice(userComments.length - 1, 1);
      renderComments();
      prepareInput({ addButtonElement });
      clearInput({ nameInputElement, commentInputElement });
      event.stopPropagation();
    });

    addButtonElement.addEventListener("click", handlePostClick);

    function handlePostClick() {
      if (
        nameInputElement.value.trim() === "" ||
        commentInputElement.value.trim() === ""
      ) {
        addButtonNonActive({ addButtonElement });
        return;
      }

      return postComments({ token, nameInputElement, commentInputElement })
        .then((response) => {
          addFormHide({ addForm, deleteButtonElement });
          commentsAddActive({ commentsAdding });
          return fetchPromiseArr();
        })
        .then(() => {
          clearInput({ nameInputElement, commentInputElement });
        })
        .catch((error) => {
          if (error.message === "Сервер недоступен") {
            alert("Сервер недоступен, попробуйте позже");
            handlePostClick();

          } else if (error.message === "Неправильный запрос") {
            alert(
              "Поля 'Имя' и 'Комментарий' должны содержать хотя бы 3 символа"
            );

            prepareInput({ addButtonElement });
          } else if (error.message === "Failed to fetch") {
            alert("Неполадки интернета");

          } else {
            console.log(error);
          }
        });

      addFormHide({ addForm, deleteButtonElement });
    }
  }
};
