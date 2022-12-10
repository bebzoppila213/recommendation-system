import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFilm } from "../pages/films/Films";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./state"
import axios from "axios";
import { authUser, registerUser, authUserFromToken, loadUserFilms, removeFilm } from "./api/user";

export interface User{
  id: number,
  email: string;
  name: string,
  img: string,
  firstName: string
  lastName: string
}

export interface UserState {
  token: string;
  isAuth: boolean
  films: IFilm[],
  user: User
}

const initialState: UserState = {
  user:{
    name: "",
    email: "",
    id: 0,
    img: '', 
    firstName: '',
    lastName: '',
  },
  token: "",
  isAuth: false,
  films: []
};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, {payload: {name, email, token}}) => {
      state.user = {...state.user, email: email, name: name}
      state.token = token
      state.isAuth = true
    });

    builder.addCase(authUser.fulfilled, (state, {payload: {name, email, token}}) => {
      state.user = {...state.user, email: email, name: name}
      state.token = token
      state.isAuth = true
    });
    builder.addCase(authUserFromToken.fulfilled, (state, action) => {
      state.isAuth = true
      state.user = action.payload
    });
    builder.addCase(authUserFromToken.rejected, (state, action) => {
      state.isAuth = false
      state.user = initialState.user
    });

    builder.addCase(loadUserFilms.fulfilled, (state, action) => {
      state.films = action.payload
    });
    builder.addCase(removeFilm.fulfilled, (state, action) => {
      console.log(state.films.filter(film => film.id !== action.payload?.filmId));
      
      state.films = state.films.filter(film => film.id !== action.payload?.filmId)
    })
  },
});

export default userSlice.reducer;
