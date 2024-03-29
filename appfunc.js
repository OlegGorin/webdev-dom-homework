import { nameInputElement, commentInputElement, addButtonElement } from "./main.js"

export const safeCode = (string) => {
    return string
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
};

export const formatDate = (date) => {
    return (
        new Date(date).toLocaleDateString("default", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        }) +
        " " +
        new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
    )
}

export const clearInput = () => {
    nameInputElement.value = "";
    commentInputElement.value = "";
}

export const prepareInput = () => {
    addButtonElement.disabled = true;
    addButtonElement.classList.add("error");
}

// Функция для имитации запросов в API
// Не смотрите особо на внутренности, мы разберемся с этим позже
export const delay = (interval = 300) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}