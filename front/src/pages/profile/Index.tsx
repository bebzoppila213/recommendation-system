import { useAppSelector } from "../../hooks/redux";
import CustomInput from "../../components/ui/CustomInput";
import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import FavoriteMovies from "./FavoriteMovies";
import FilmsRecommendation from "./FilmsRecommendation";

export default function Index() {
  const user = useAppSelector((state) => state.user);

  const profileState = useState({});
  const updateProfileState = (text: string) => {};

  return (
    <div>
      <div className="hero user-hero">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="hero-ct">
                <h1>Профиль пользователя {user.user.name}</h1>
                <ul className="breadcumb">
                  <li className="active">
                    <a href="#">Home</a>
                  </li>
                  <li>
                    {" "}
                    <span className="ion-ios-arrow-right"></span>Profile
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-single">
        <div className="container">
          <div className="row ipad-width">
            <div className="col-md-3 col-sm-12 col-xs-12">
              <div className="user-information">
                <div className="user-img">
                  <a href="#">
                    <img src="images/uploads/user-img.png" alt="" />
                    <br />
                  </a>
                  <a href="#" className="redbtn">
                    Change avatar
                  </a>
                </div>
                <div className="user-fav">
                  <p>Account Details</p>
                  <ul>
                    <li className="active">
                      <NavLink
                      className={({isActive})=> ( isActive ? "active " : " ") + "btn btn-default dropdown-toggle lv1"}
                        to={"/profile"}
                      >
                        Профиль
                      </NavLink>
                    </li>
                    <li>
                    <NavLink
                        className={({isActive})=> ( isActive ? "active " : " ") + "btn btn-default dropdown-toggle lv1"}
                        to={"/profile/favorite-films"}
                      >
                        Оценённые фильмы
                      </NavLink>
                    </li>
                    <li>
                    <NavLink
                      className={({isActive})=> ( isActive ? "active " : " ") + "btn btn-default dropdown-toggle lv1"}
                        to={"/profile/recommendation-films"}
                      >
                        Рекомендации
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <div className="user-fav">
                  <p>Others</p>
                  <ul>
                    <li>
                      <a href="#">Change password</a>
                    </li>
                    <li>
                      <a href="#">Log out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/favorite-films" element={<FavoriteMovies />} />
              <Route
                path="/recommendation-films"
                element={<FilmsRecommendation />}
              />
              {/* <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } /> */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
