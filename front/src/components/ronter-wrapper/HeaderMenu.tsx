import { useAppDispatch } from "../../hooks/redux";
import { openModal } from "../../state/modalSlice";

export default function HeaderMenu() {
  const dispatcher = useAppDispatch();

  const btnRegisterClick = () => {
    dispatcher(openModal({ modalContent: "register" }));
  };

  const btnAuthClick = () => {
    dispatcher(openModal({ modalContent: "auth" }));
  };

  return (
    <ul className="nav navbar-nav flex-child-menu menu-right">
      <li className="loginLink header-login">
        <button onClick={btnAuthClick} className="header-login">
          Войти
        </button>
      </li>
      <li className="btn signupLink ">
        <button onClick={btnRegisterClick} className="header-register">
          Зарегистрироватся
        </button>
      </li>
    </ul>
  );
}
