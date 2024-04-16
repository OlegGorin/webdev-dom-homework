import { toggleLike, token } from "./api.js";
import { delay } from "./helpers.js";
import { userComments } from "./main.js";
import { renderComments } from "./renderTasks.js";

export let textInput;

export const initEventListeners = () => {
  const commentElements = document.querySelectorAll(".comment");
  const commentInputElement = document.querySelector(".add-form-text");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", (event) => {
      const index = commentElement.dataset.index;
      event.stopPropagation();

      const QUOTE_BEGIN = "QUOTE_BEGIN";
      const QUOTE_END = "QUOTE_END";
      commentInputElement.value = `> ${QUOTE_BEGIN} ${userComments[index].text} \n\n${userComments[index].name}, ${QUOTE_END}`;
    });
  }
};

export const changeLikeButton = () => {
  const likeButtonElements = document.querySelectorAll(".like-button");
  const commentInputElement = document.querySelector(".add-form-text");

  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      likeButtonElement.classList.add("-loading-like");
      const index = likeButtonElement.dataset.index;

      const id = userComments[index].id;

      toggleLike({ token, id });

      delay(2000).then(() => {
        userComments[index].likesCounter = userComments[index].likeButton
          ? userComments[index].likesCounter - 1
          : userComments[index].likesCounter + 1;
        userComments[index].likeButton = !userComments[index].likeButton;
        userComments[index].isLikeLoading = false;
        textInput = commentInputElement.value;
        renderComments({ token });
      });
    });
  }
};
