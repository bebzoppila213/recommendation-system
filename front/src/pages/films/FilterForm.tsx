import CustomSelect, { OptionType } from "../../components/ui/CustomSelect";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/ui/CustomInput";
import useFetch from "../../hooks/useFetch";
import { getMeanDate, getDateInInterval } from "../../assets/DateFunc";

export type GenreType = {
  id: number;
  name: string;
};

export type DateType = {
  maxDate: string;
  minDate: string;
};

type FilterFormProps = {
  submitForm: (formData: FormStateType) => void;
};

export type FormStateType = {
  genres: string[];
  raiting: string;
  name: string;
  startDate: string,
  endDate: string
};

export const defaultFilterState = {
  genres: [],
    raiting: "",
    name: "",
    startDate: '',
    endDate: ''
}

export default function FilterForm({ submitForm }: FilterFormProps) {
  const [formState, setFormState] = useState<FormStateType>(defaultFilterState);
  const genresdata = useFetch<GenreType[], {}>(
    [],
    {},
    "http://localhost:8090/films/genres"
  );
  const dateInfo = useFetch<DateType, {}>(
    { maxDate: "", minDate: "" },
    {},
    "http://localhost:8090/films/date"
  );

  const genresToOptions = () => {
    return genresdata.allData.map((genr) => ({
      text: genr.name,
      value: String(genr.id),
    })) as OptionType[];
  };

  const raitingToOptions = () => {
    return Array(10)
      .fill(0)
      .map((e, i) => ({
        text: String(i) + "+",
        value: String(i),
      })) as OptionType[];
  };

  const dateToOptions = (start: Date | string, end: Date | string) => {
    const allDate = getDateInInterval(start, end);
    return allDate.map((dateItem) => ({
      text: String(dateItem.getFullYear()),
      value: String(dateItem),
    }));
  };

  const onSelected = (data: string | string[], key: keyof FormStateType) => {
    if (typeof data == "string") {
      setFormState({ ...formState, [key]: data });
    } else {
      setFormState({ ...formState, [key]: data });
    }
  };


  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitForm(formState);
  };

  return (
    <div className="searh-form">
      <h4 className="sb-title">Поиск по фильмам</h4>
      <form onSubmit={formSubmit} className="form-style-1" action="#">
        <div className="row">
          <CustomInput
            classInner="col-md-12 form-it"
            updateState={(text) => setFormState({ ...formState, name: text })}
            label="Название фильма"
          ></CustomInput>
          <CustomSelect
            onSelected={(val) => onSelected(val, 'genres')}
            label="Выберите жанры"
            multiple={true}
            options={genresToOptions()}
          ></CustomSelect>
          <CustomSelect
            onSelected={(val) => onSelected(val, 'raiting')}
            label="Выберите рейтинг"
            multiple={false}
            options={raitingToOptions()}
          ></CustomSelect>
          <div className="col-md-12 form-it">
            <label>Дата выхода</label>
            <div className="row">
              <CustomSelect
                classWrapper="col-md-6 d-flex ju-co-center"
                onSelected={(val) => onSelected(val, "startDate")}
                multiple={false}
                options={dateToOptions(
                  dateInfo.allData.minDate,
                  dateInfo.allData.maxDate
                )}
              ></CustomSelect>
              <CustomSelect
                classWrapper="col-md-6 d-flex ju-co-center"
                onSelected={(val) => onSelected(val, "endDate")}
                multiple={false}
                options={dateToOptions(
                  dateInfo.allData.minDate,
                  dateInfo.allData.maxDate,
                )}
              ></CustomSelect>
            </div>
          </div>
          <div className="col-md-12 ">
            <button className="searh-form__submit" type="submit">
              Отфильтровать
            </button>
            {/* <input className="submit" type="submit" value="submit" /> */}
          </div>
        </div>
      </form>
    </div>
  );
}
