import { userComments, listElement } from "./main.js";
import { initEventListeners, changeLikeButton } from "./listeners.js";

export const renderComments = () => {
  const commentHTML = userComments
    .map((comment, index) => {
      let lkBtn = "";
      if (userComments[index].likeButton === true) {
        lkBtn = "like-button -active-like";
        // lkBtn = "like-button -loading-like";
      } else {
        lkBtn = "like-button";
      }
      return `<li data-index="${index}" class="comment">
          <div class="comment-header">
            <div>${userComments[index].name}</div>
            <div>${userComments[index].date}</div>
          </div>
          <div class="comment-body">
            <div data-index="${index}" class="comment-text comment-newline">
              ${userComments[index].text}
            </div >
          </div >
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${userComments[index].likesCounter}</span>
              <button data-index=${index} class="${lkBtn}"></button>
            </div>
          </div>
        </li >`;
    })
    .join("");

  listElement.innerHTML = commentHTML;

  initEventListeners();
  changeLikeButton();
};
