export const sanitize = (string) => {
  return string
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
};

export const formatDate = (date) => {
  return (
    new Date(date).toLocaleDateString('default', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
    + ' '
    + new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  );
};

// export const clearInput = ({ commentInputElement }) => {
//   commentInputElement.value = '';
// };

// export const prepareInput = ({ addButtonElement }) => {
//   addButtonElement.disabled = true;
//   addButtonElement.classList.add('error');
// };

// Функция для имитации запросов в API
// Не смотрите особо на внутренности, мы разберемся с этим позже
export const delay = (interval = 300) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
};

// // вспомогательные функции
// export const commentsLoadActive = ({ commentsLoading }) => {
//   commentsLoading.classList.remove('hide');
// };

// export const commentsLoadHide = ({ commentsLoading }) => {
//   commentsLoading.classList.add('hide');
// };

// export const commentsAddActive = ({ commentsAdding }) => {
//   commentsAdding.classList.remove('hide');
// };

// export const commentsAddHide = ({ commentsAdding }) => {
//   commentsAdding.classList.add('hide');
// };

// export const addFormActive = ({ addForm }) => {
//   addForm.classList.remove('hide');
// };

// export const addFormHide = ({ addForm }) => {
//   addForm.classList.add('hide');
// };

// export const addButtonActive = ({ addButtonElement }) => {
//   addButtonElement.disabled = false;
//   addButtonElement.classList.remove('error');
// };

// export const addButtonNonActive = ({ addButtonElement }) => {
//   addButtonElement.disabled = true;
//   addButtonElement.classList.add('error');
// };
