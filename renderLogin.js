import { fetchPromiseArr, userComments } from "./main.js";
import { getListComments } from "./listComments.js";
import { loginUser, regUser, token, name, setToken, setName } from "./api.js";

export const renderLogComment = ({ fetchPromiseArr }) => {
  let isRegMode = false;
  const appElement = document.getElementById("app");

  const commentHtmlNonEdit = userComments
    .map((comment, index) => getListComments({ userComments, index }))
    .join("");

  const appHTML = `
    <div class="container">
        <ul class="comments">
            ${commentHtmlNonEdit}
        </ul> 
        <div class="form-link">\n Чтобы добавить комментарий, <a id="login-link" class="form-link" href="#">авторизуйтесь</a></div>
    </div>`;

  appElement.innerHTML = appHTML;

  const logElement = document.getElementById("login-link");

  document.getElementById("login-link").addEventListener("click", () => {
    const renderLogForm = () => {
      const appHTML = `
            <div class="container">
                <div class="form-login">
                    <h3 class="form-title">Форма
                    ${!isRegMode ? "входа" : "регистрации"}</h3>
                    <div class="form-input">
                        ${!isRegMode
          ? ""
          : `<input type="text" id="name-input" class="input" placeholder="Введите ваше имя" />`
        }
                        <input type="text" id="login-input" class="input" placeholder="Введите логин" />
                        <input type="text" id="password-input" class="input" placeholder="Введите пароль" />
                        <button id="login-button" class="button">
                            ${!isRegMode ? "Войти" : "Зарегистрироваться"
        }</button>
                        <a id="login-switch" class="login-switch" href="#">
                            ${isRegMode ? "Войти" : "Зарегистрироваться"}</a>
                    </div>
                </div>
            </div>`;
      appElement.innerHTML = appHTML;

      document.querySelector(".login-switch").addEventListener("click", () => {
        isRegMode = !isRegMode;
        renderLogForm();
      });

      const buttonElement = document.getElementById("login-button");
      const nameInputElement = document.getElementById("name-input");
      const loginInputElement = document.getElementById("login-input");
      const passwordInputElement = document.getElementById("password-input");

      document.getElementById("login-button").addEventListener("click", () => {
        if (!isRegMode) {
          const login = loginInputElement.value;
          const password = passwordInputElement.value;

          if (!login) {
            alert("Введите логин");
            return;
          }

          if (!password) {
            alert("Введите пароль");
            return;
          }

          loginUser({
            login: login,
            password: password,
          })
            .then((responseData) => {
              setToken(`Bearer ${responseData.user.token}`);
              setName(responseData.user.name);
              console.log(`Bearer ${responseData.user.token}`);
              console.log(responseData.user.name);
              fetchPromiseArr();
            })
            .catch((error) => {
              if (error.message === "Сервер недоступен") {
                alert("Сервер недоступен, попробуйте позже");
                fetchPromiseArr();
              } else if (error.message === "Нет авторизации") {
                alert(error.message);
              } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                console.log(error);
              }
            });
        } else {

          const name = nameInputElement.value;
          const login = loginInputElement.value;
          const password = passwordInputElement.value;

          if (!name) {
            alert("Введите имя");
            return;
          }

          if (!login) {
            alert("Введите логин");
            return;
          }

          if (!password) {
            alert("Введите пароль");
            return;
          }

          regUser({
            login: login,
            password: password,
            name: name,
          })
            .then((responseData) => {
              setToken(`Bearer ${responseData.user.token}`);
              setName(responseData.user.name);
              console.log(`Bearer ${responseData.user.token}`);
              console.log(responseData.user.name);
              fetchPromiseArr();
            })
            .catch((error) => {
              if (error.message === "Сервер недоступен") {
                alert("Сервер недоступен, попробуйте позже");
                fetchPromiseArr();
              } else if (error.message === "Нет авторизации") {
                alert(error.message);
              } else {
                alert("Кажется, у вас сломался интернет, попробуйте позже");
                console.log(error);
              }
            });
        }

      });
    };
    renderLogForm();
  });
};
