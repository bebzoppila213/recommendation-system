import { useEffect } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useAppSelector } from "../../hooks/redux";
import { loadUserFilms, removeFilm } from "../../state/api/user";
import FilmsComponent from "../../components/Films";
import SortFilms from "../../components/SortFilms";
import { IFilm } from "../films/Films";
import useSort from "../../hooks/useSort";

export default function FavoriteMovies() {
  const dispatcher = useAppDispatch();
  const { user } = useAppSelector((state) => state);
  const { data, setData, updateSortField } = useSort<IFilm>("ru_title");

  useEffect(() => {
    dispatcher(loadUserFilms());
    setData(user.films);
  }, []);

  const onBtnFimClick = (filmId: number) => {
    dispatcher(removeFilm({filmId: filmId}));
  }

  return (
    <div className="col-md-9 col-sm-12 col-xs-12">
      <SortFilms updateSortedFiled={updateSortField}></SortFilms>
      <FilmsComponent
        btnFilmText="Удалить фильм"
        onBtnFilmClick={onBtnFimClick}
        isBtn={true}
        films={data}
      ></FilmsComponent>
    </div>
  );
}
