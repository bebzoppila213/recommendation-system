
import { IFilm } from "./Films"

type FilmItemProps = {
    film: IFilm,
    onBtnClick?: (filmId: number) => void,
    btnText: string,
    isBtn: boolean
}

export default function FilmItem({ film, isBtn = false, onBtnClick = () => 0, btnText }: FilmItemProps){

    return(
        <div className="movie-item-style-2">
          
        <img src={`http://localhost:8090/images/${film.id}.jpg`} alt="" />
        <div className="mv-item-infor">
          <h6>
            <a href="moviesingle.html">
              {film.ru_title} <span>({new Date(film.release_date).getFullYear()})</span>
            </a>
          </h6>
          <p className="rate">
            <i className="ion-android-star"></i>
            <span>{film.vote_average}</span> /10
          </p>
          <p className="describe">
          {film.ru_overview}
          </p>
          <p className="run-time">
            {" "}
            Длительность: {film.runtime} минут
            <span>Дата выхода: {new Date(film.release_date).getFullYear()}</span>
          </p>
          <p>
            Компании производители:  
            {
                // film.production_companies && film.production_companies.slice(0, 3).map((country) => <span key={country.id}> {country.name} </span>)
            }
            
            {/* <a href="#">Chris Evans,</a>{" "}
            <a href="#">Samuel L. Jackson,</a>{" "}
            <a href="#"> Scarlett Johansson</a> */}
          </p>
          {
            isBtn && <button onClick={() => onBtnClick(film.id)} className="btn_add">{btnText}</button>
          }
          
        </div>
      </div>
    )
}