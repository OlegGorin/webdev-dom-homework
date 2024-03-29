import { safeCode, formatDate, clearInput, prepareInput, delay } from "./appfunc.js";
import { nameInputElement, commentInputElement, listElement, addButtonElement, userComments } from "./main.js";

export const initEventListeners = () => {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", (event) => {
            const index = commentElement.dataset.index;
            event.stopPropagation();

            let QUOTE_BEGIN = "QUOTE_BEGIN";
            let QUOTE_END = "QUOTE_END";
            commentInputElement.value = `> ${QUOTE_BEGIN} ${userComments[index].text} \n\n${userComments[index].name}, ${QUOTE_END}`;
        });
    }
};

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

export const changeLikeButton = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", (event) => {
            likeButtonElement.classList.add("-loading-like");
            const index = likeButtonElement.dataset.index;
            event.stopPropagation();

            console.log(likeButtonElement.dataset);

            delay(2000).then(() => {
                userComments[index].likesCounter = userComments[index].likeButton
                    ? userComments[index].likesCounter - 1
                    : userComments[index].likesCounter + 1;
                userComments[index].likeButton = !userComments[index].likeButton;
                userComments[index].isLikeLoading = false;
                renderComments();
                prepareInput();
            });
        });
    }
};