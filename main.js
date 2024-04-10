"use strict";
import { getComments, postComments } from "./api.js";
import { initEventListeners, changeLikeButton } from "./listeners.js";
import { renderComments } from "./renderTasks.js";
import { renderLogComment } from "./renderLogin.js";
import { formatDate } from "./helpers.js";


export let userComments = [];

export let isLoading = true;

// const commentsLoading = document.querySelector(".loading");

export function fetchPromiseArr() {
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

      userComments = appComments;
      renderComments();
      isLoading = false;
    })
    .then((response) => {

    })
    .catch((error) => {
      if (error.message === "Сервер недоступен") {
        alert("Сервер недоступен, попробуйте позже");
        fetchPromiseArr();
      } else if (error.message === "Failed to fetch") {
        alert("Неполадки интернета");
      } else {
        console.log(error);
      }
      console.warn(error);
    });
}

fetchPromiseArr();

console.log("It works!");
