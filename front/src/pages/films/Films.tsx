import axios from "axios";
import React, { useEffect, useState } from "react";
import FilmItem from "./FilmItem";
import useFetch from "../../hooks/useFetch";
import FilterForm, {
  FormStateType,
  GenreType,
  defaultFilterState,
} from "./FilterForm";
import { useAppDispatch } from "../../hooks/redux";
import { addFilmToUser } from "../../state/api/user";
import FilmsComponent from "../../components/Films";
import CustomSelect from "../../components/ui/CustomSelect";
import Pagination from "../../components/Pagination";

type ProductionCompaniesType = {
  name: string;
  id: number;
};

type ProductionCountriesType = {
  iso_3166_1: string;
  name: number;
};

export interface IFilm {
  id: number;
  genres: GenreType[];
  homepage: string;
  budget: string;
  imdb_id: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesType[];
  production_countries: ProductionCountriesType[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  vote_average: number;
  vote_count: number;
  ru_title: string;
  ru_overview: string;
}

type FilmsApiParamsType = {
  take: string;
  skip: string;
  filter: FormStateType;
};

const defaultApiParams = {
  take: "5",
  skip: "0",
  filter: defaultFilterState,
};
const selectOptions = [
  { text: "5 фильмов", value: "5" },
  { text: "10 фильмов", value: "10" },
];

export default function Films() {
  const { allData, updateApiParams, apiParams } = useFetch<
    IFilm[],
    FilmsApiParamsType
  >([], defaultApiParams, "http://localhost:8090/films/films");
  const dispatcher = useAppDispatch();

  const updatePagination = (newval: number) => {
    updateApiParams("skip", String(Math.max(0, newval)));
  };

  const updateTakeFilms = (take: string | string[]) => {
    if (typeof take === "string") {
      updateApiParams("take", take);
    }
  };

  const updateApiFilter = (newFilter: FormStateType) => {
    updateApiParams("filter", newFilter);
  };

  const onBtnAddClick = (filId: number) => {
    dispatcher(addFilmToUser({ filmId: filId }));
  };

  return (
    <div className="page-single movie_list">
      <div className="container">
        <div className="row ipad-width2">
          <div className="col-md-8 col-sm-12 col-xs-12">
            <FilmsComponent
              classInner=""
              films={allData}
              onBtnFilmClick={onBtnAddClick}
              isBtn={true}
            ></FilmsComponent>
            <Pagination
              activePagination={Number(apiParams.skip) / 5 + 1}
              onPaginationNext={() =>
                updatePagination(Number(apiParams.skip) + 5)
              }
              onPaginationBack={() =>
                updatePagination(Number(apiParams.skip) - 5)
              }
            ></Pagination>
            <CustomSelect
              classWrapper="topbar-filter"
              onSelected={updateTakeFilms}
              options={selectOptions}
            ></CustomSelect>
          </div>

          <div className="col-md-4 col-sm-12 col-xs-12">
            <div className="sidebar">
              <FilterForm submitForm={updateApiFilter}></FilterForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
