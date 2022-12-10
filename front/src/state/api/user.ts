import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFilm } from "../../pages/films/Films";
import { RootState } from "../state";
import { User } from "../userSlice";

type ResponseType<T> = {
  ok: boolean;
  messages: string;
  data: T;
};

type RegisterUserResponse = { token: string };

type UserRegisterProps = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (data: UserRegisterProps, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResponseType<RegisterUserResponse>>(
        "http://localhost:8090/user/register",
        data
      );
      if (response.data.ok) {
        return {
          name: data.name,
          email: data.email,
          token: response.data.data.token,
        };
      }
      return rejectWithValue({});
    } catch {
      return rejectWithValue({});
    }
  }
);

type AuthUserFromTokenResponse = User;

export const authUserFromToken = createAsyncThunk(
  "user/authUserFromToken",
  async (_, { rejectWithValue, getState }) => {
    const { user } = getState() as RootState;
    try {
      const response = await axios.post<
        ResponseType<AuthUserFromTokenResponse>
      >(
        "http://localhost:8090/user/user-data",
        {},
        { headers: { authorization: `Baber ${user.token}` } }
      );

      if (response.data.ok) {
        return response.data.data;
      }
      return rejectWithValue({});
    } catch {
      return rejectWithValue({});
    }
  }
);

type AuthUserProps = {
  email: string;
  password: string;
};

type AuthUserResponse = { token: string; name: string };

export const authUser = createAsyncThunk(
  "user/authUser",
  async (data: AuthUserProps, { rejectWithValue }) => {
    try {
      const response = await axios.post<ResponseType<AuthUserResponse>>(
        "http://localhost:8090/user/auth-email",
        data
      );
      if (response.data.ok) {
        return {
          email: data.email,
          token: response.data.data.token,
          name: response.data.data.name,
        };
      }
      return rejectWithValue({});
    } catch {
      return rejectWithValue({});
    }
  }
);

type LoadUserFilmsResponse = IFilm[];

export const loadUserFilms = createAsyncThunk(
  "user/loadUserFilms",
  async (_, { rejectWithValue, getState }) => {
    const { user } = getState() as RootState;
    try {
      const response = await axios.post<ResponseType<LoadUserFilmsResponse>>(
        "http://localhost:8090/user/films",
        {},
        { headers: { authorization: `Baber ${user.token}` } }
      );

      if (response.data.ok) {
        return response.data.data;
      }
      return rejectWithValue([]);
    } catch {
      return rejectWithValue([]);
    }
  }
);

type AddFilmToUserProps = {
  filmId: number;
};

export const addFilmToUser = createAsyncThunk(
  "user/addFilmToUser",
  async ({ filmId }: AddFilmToUserProps, { getState }) => {
    const { user } = getState() as RootState;
    try {
      const response = await axios.post(
        "http://localhost:8090/user/add-film",
        { filmId },
        { headers: { authorization: `Baber ${user.token}` } }
      );

      if (response.data.ok) {
        return response.data.data;
      }
    } catch {}
  }
);

type RemoveFilmToUserProps = {
  filmId: number;
};
export const removeFilm = createAsyncThunk(
  "user/removeFilm",
  async ({ filmId }: RemoveFilmToUserProps, { getState }) => {
    try {
      const { user } = getState() as RootState;
      const response = await axios.post(
        "http://localhost:8090/user/remove-film",
        { filmId },
        { headers: { authorization: `Baber ${user.token}` } }
      );
      if (response.data.ok) {
        return { filmId: filmId };
      }
    } catch {}
  }
);
