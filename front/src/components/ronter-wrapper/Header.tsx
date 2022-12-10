import HeaderMenu from "./HeaderMenu";
import { useAppSelector } from "../../hooks/redux";
import logo1 from "../../assets/images/logo1.png";
import { Link } from "react-router-dom";

export default function Header() {
  const user = useAppSelector((state) => state.user);

  return (
    <header className="ht-header">
      <div className="container">
        <nav className="navbar navbar-default navbar-custom">
          <div className="navbar-header logo">
            <div
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span className="sr-only">Toggle navigation</span>
              <div id="nav-icon1">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <Link to={"/"}>
              <img
                className="logo"
                src={logo1}
                alt=""
                width="119"
                height="58"
              />
            </Link>
          </div>
          <div
            className="collapse navbar-collapse flex-parent"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav flex-child-menu menu-left">
              <li className="dropdown first">
                <Link className="btn btn-default dropdown-toggle lv1" to={"/"}>
                  Главная страница
                </Link>
              </li>
              <li className="dropdown first">
                <Link
                  className="btn btn-default dropdown-toggle lv1"
                  to={"/films"}
                >
                  Фильмы
                </Link>
              </li>
              {user.isAuth && (
                <li className="dropdown first">
                  <Link
                    className="btn btn-default dropdown-toggle lv1"
                    to={"/profile"}
                  >
                    Профиль
                  </Link>
                </li>
              )}
            </ul>
            {user.isAuth ? (
              <p className="header-user-text">Добро пожаловать {user.user.name}</p>
            ) : (
              <HeaderMenu></HeaderMenu>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
