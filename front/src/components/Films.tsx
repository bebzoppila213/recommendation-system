import FilmItem from "../pages/films/FilmItem";
import { IFilm } from "../pages/films/Films";
import CustomSelect from "./ui/CustomSelect";

type FilmsProps = {
  films: IFilm[];
  classInner?: string;
  onBtnFilmClick?: (id: number) => void;
  btnFilmText?: string;
  isBtn?: boolean
};

export default function Films({
  films,
  classInner = "flex-wrap-movielist user-fav-list",
  btnFilmText = 'Добавить в любимые',
  onBtnFilmClick = () => 0,
  isBtn = false
}: FilmsProps) {
  return (
    <div className={classInner}>
      {films.map((film) => (
        <FilmItem  isBtn={isBtn} onBtnClick={() => onBtnFilmClick(film.id)} btnText={btnFilmText} key={film.id} film={film}></FilmItem>
      ))}
    </div>
  );
}
