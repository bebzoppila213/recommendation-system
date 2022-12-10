import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import FilmItem from "../films/FilmItem";
import { IFilm } from "../films/Films";
import FilmsComponent from "../../components/Films";
import useSort from "../../hooks/useSort";
import SortFilms from "../../components/SortFilms";

export default function MovieRecommendation() {
  const { data, setData, updateSortField } = useSort<IFilm>("ru_title");
    const user = useAppSelector(state => state.user)
    
    const loadFilmsRecommends = async () => {
        const response = await axios.post('http://localhost:8090/user/user-recommends',{}, {headers: {authorization: `Baber ${user.token}`}} )
        setData (response.data.data)
    }

    useEffect(()=> {
        loadFilmsRecommends()
    },[])
    
  return (
    <div className="col-md-9 col-sm-12 col-xs-12">
      <SortFilms updateSortedFiled={updateSortField}></SortFilms>
      <FilmsComponent films={data}></FilmsComponent>
    </div>
  );
}
