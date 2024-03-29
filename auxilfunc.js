import {
    nameInputElement, commentInputElement, listElement, addButtonElement,
    userComments, commentsLoading, commentsAdding, addForm, deleteButtonElement
} from "./main.js";

export const commentsLoadActive = () => {
    commentsLoading.classList.remove("hide");
}

export const commentsLoadHide = () => {
    commentsLoading.classList.add("hide");
}

export const commentsAddActive = () => {
    commentsAdding.classList.remove("hide");
}

export const commentsAddHide = () => {
    commentsAdding.classList.add("hide");
}

export const addFormActive = () => {
    addForm.classList.remove("hide");
}

export const addFormHide = () => {
    addForm.classList.add("hide");
}

export const addButtonActive = () => {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove("error");
}

export const addButtonNonActive = () => {
    addButtonElement.disabled = true;
    addButtonElement.classList.add("error");
}

export const delButtonActive = () => {
    deleteButtonElement.classList.remove("hide");
}

export const delButtonHide = () => {
    deleteButtonElement.classList.add("hide");
}