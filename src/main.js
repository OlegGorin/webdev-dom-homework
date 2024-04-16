import { format } from 'date-fns';
import { getComments } from './api.js';
import { renderComments } from './renderTasks.js';
// import { formatDate } from "./helpers.js";

export let userComments = [];

export let isLoading = true;

let token;

export function fetchPromiseArr() {
  // getComments()      // 16.04.24
  getComments(token)    // 16.04.24
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        const formatDate = format(
          new Date(comment.date),
          'yyyy-MM-dd hh.mm.ss',
        );
        return {
          id: comment.id,
          name: comment.author.name,
          // date: formatDate(comment.date),
          date: formatDate,
          text: comment.text,
          likesCounter: comment.likes,
          likeButton: false,
        };
      });

      userComments = appComments;
      // renderComments();        // 16.04.24
      renderComments({ token });      // 16.04.24
      isLoading = false;
    })
    .catch((error) => {
      if (error.message === 'Сервер недоступен') {
        alert('Сервер недоступен, попробуйте позже');
        fetchPromiseArr();
      } else if (error.message === 'Failed to fetch') {
        alert('Неполадки интернета');
      } else {
        console.log(error);
      }
      console.warn(error);
    });
}

fetchPromiseArr();

console.log('It works!');

// function renderMainPage() {
//   document.querySelector('#app').innerHTML = `
//   <div class="container">
//     <ul class="comments">
//     </ul>
//     <div class="form"></div>
//   </div>`;
//   // fetchPromiseArr();
//   // renderForm();
// }

// function renderForm() {
//   document.querySelector(".form").innerHTML = token ? "будет форма" : "ссылка на авторизацию"
//   if (token) { "запускается форма"}
//   else { "ссылка на слушатель события"}
// }
