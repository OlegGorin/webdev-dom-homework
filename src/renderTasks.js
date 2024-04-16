import { userComments, fetchPromiseArr, isLoading } from './main.js';
import { initEventListeners, changeLikeButton, textInput } from './listeners.js';
import { getListComments } from './listComments.js';
import { renderLogComment } from './renderLogin.js';
import {
  postComments,
  deleteComment,
  token, // 16.04.24
  name,
  commentsURL,
} from './api.js';

// export const renderComments = ({ token }) => { // 16.04.24
export const renderComments = () => {
  const appElement = document.getElementById('app');
  // вместо app получить container
  // const appElement = document.querySelector(".container");
  //  в него и будет помещаться  ? `<p class="adding">
  // Пожалуйста, подождите, загружаю комментарии...</p>`
  //           : ""

  const loadHTML = `
      <div class='container'>
        ${
  isLoading
    ? `<p class='adding'>Пожалуйста, подождите, загружаю комментарии...</p>`
    : ''
}
      </div>`;

  appElement.innerHTML = loadHTML;

  if (!token) {
    renderLogComment({ fetchPromiseArr });
  } else {
    const commentHTML = userComments
      .map((comment, index) => getListComments({ userComments, index }))
      .join('');

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
      </div>`;

    appElement.innerHTML = appHTML;

    const addForm = document.querySelector('.add-form');
    const nameInputElement = document.querySelector('.add-form-name');
    const commentInputElement = document.querySelector('.add-form-text');
    const addButtonElement = document.querySelector('.add-form-button');
    const listElement = document.querySelector('.comments');
    const deleteButtonElement = document.querySelector('.del-form-button');
    const commentsAdding = document.querySelector('.adding');

    listElement.innerHTML = commentHTML;

    commentsAdding.classList.add('hide');

    initEventListeners();
    changeLikeButton();

    addButtonElement.disabled = true;
    addButtonElement.classList.add('error');

    const prepareInput = () => {
      addButtonElement.disabled = true;
      addButtonElement.classList.add('error');
    };

    nameInputElement.disabled = true;
    nameInputElement.addEventListener('input', () => {
      addButtonElement.disabled = false;
      addButtonElement.classList.remove('error');
    });

    if (textInput === undefined) {
      commentInputElement.value = '';
    } else {
      commentInputElement.value = textInput;
    }
    commentInputElement.addEventListener('input', () => {
      addButtonElement.disabled = false;
      addButtonElement.classList.remove('error');
    });

    const handlePostClick = () => {
      if (
        nameInputElement.value.trim() === ''
        || commentInputElement.value.trim() === ''
      ) {
        addButtonElement.disabled = false;
        addButtonElement.classList.remove('error');
        return;
      }

      postComments({
        token,
        nameInputElement,
        commentInputElement,
      })
        .then(() => {
          addForm.classList.add('hide');
          commentsAdding.classList.remove('hide');
          return fetchPromiseArr();
        })
        .then(() => {
          commentInputElement.value = '';
        })
        .catch((error) => {
          if (error.message === 'Сервер недоступен') {
            alert('Сервер недоступен, попробуйте позже');
            handlePostClick();
          } else if (error.message === 'Нет авторизации') {
            alert('Зарегистрируйтесь, пожалуйста');
          } else if (error.message === 'Неправильный запрос') {
            alert(
              "Поля 'Имя' и 'Комментарий' должны содержать хотя бы 3 символа",
            );
            prepareInput();
          } else if (error.message === 'Failed to fetch') {
            alert('Неполадки интернета');
          } else {
            console.log(error);
          }
        });
      // addForm.classList.add('hide');
    };

    addButtonElement.addEventListener('click', handlePostClick);

    document.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        handlePostClick();
      }
    });

    // deleteButtonElement.addEventListener("click", (event) => {
    //     userComments.splice(userComments.length - 1, 1)
    //     renderComments()
    //     prepareInput()
    //     clearInput({ nameInputElement, commentInputElement })
    //     event.stopPropagation()
    // })

    // function deleteLastComment() {
    const deleteLastComment = () => {
      const commentId = userComments[userComments.length - 1].id;
      // textInput = '';

      return deleteComment({ token, commentId })
        .then(() => {
          commentInputElement.value = '';
          return fetchPromiseArr();
        })
        .catch((error) => {
          if (error.message === 'Сервер недоступен') {
            alert('Сервер недоступен, попробуйте позже');
          } else if (error.message === 'Нет авторизации') {
            alert('Зарегистрируйтесь, пожалуйста');
          } else if (error.message === 'Страница недоступна') {
            alert(`Страница ${commentsURL}/${commentId} не найдена`);
          } else if (error.message === 'Failed to fetch') {
            alert('Неполадки интернета');
          } else {
            console.log(error);
          }
        });
    };

    deleteButtonElement.addEventListener('click', deleteLastComment);
  }
};
