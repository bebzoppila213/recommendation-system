import React, { useEffect } from "react";
import Index from "./pages/index/Index";
import { Routes, Route } from "react-router-dom";
import Header from "./components/ronter-wrapper/Header";
import RegisterForm from "./components/forms/RegisterForm";
import Modal from "./components/ronter-wrapper/Modal";
import Footer from "./components/ronter-wrapper/Footer";
import Films from "./pages/films/Films";
import ProfileIndex from "./pages/profile/Index";
import Profile from "./pages/profile/Profile"
import FavoriteMovies from "./pages/profile/FavoriteMovies";
import { useAppDispatch } from "./hooks/redux";
import { authUserFromToken, authUser } from "./state/api/user";
import FilmsRecommendation from "./pages/profile/FilmsRecommendation";

function App() {
  const dispatcher = useAppDispatch()

  useEffect(()=> {
    dispatcher(authUserFromToken())
  },[])

  return (
    <div className="App">
      <Modal></Modal>

      <Header></Header>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/films" element={<Films />} />
        <Route path="/profile/*" element={<ProfileIndex />} >
          <Route index element={<Profile />} />
          <Route path="favorite-films" element={<FavoriteMovies />} />
          <Route path="recommendation-films" element={<FilmsRecommendation />} />
        </Route>
        {/* <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
