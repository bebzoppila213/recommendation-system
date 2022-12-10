
import CustomSelect from "./ui/CustomSelect"
import {IFilm} from "../pages/films/Films"
type SortOptionsType = {
    text: string,
    value: 'vote_count' | "ru_title" | 'vote_average' | "ru_overview"
}
const sortOptions: SortOptionsType[] = [
    {
        text: 'Название фильма',
        value: 'ru_title'
    },
    {
        text: 'Описание фильма',
        value: 'ru_overview'
    },
    {
        text: 'Рейтинг фильма',
        value: 'vote_average'
    },
    {
        text: 'Колличество оценок',
        value: 'vote_count'
    }
]

type SortFilmsProps = {
    updateSortedFiled: (newSortField: 'vote_count' | "ru_title") => void
}
export default function SortFilms({updateSortedFiled}:SortFilmsProps){

    const onSelected = (selectValue: string | string[]) => {

        if(typeof(selectValue) === 'string'){
            const val = selectValue as 'vote_count' | "ru_title"
            updateSortedFiled(val)
        }   
    }

    return(
        <div className="topbar-filter user">
            {/* <p>Найдено <span>{user.films.length} </span>фильм (-ов)</p> */}
            <label>Сотировать по:</label>
            <CustomSelect options={sortOptions} onSelected={onSelected}></CustomSelect>
            {/* <select>
                <option value="range">-- Choose option --</option>
                <option value="saab">-- Choose option 2--</option>
            </select> */}
        </div>
    )
}