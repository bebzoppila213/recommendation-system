import { generate, verify } from "password-hash";
import { env } from "process";
import BaseService from "./BaseService";
import axios from "axios";

export default class UserService extends BaseService {
  public async register(
    name: string,
    email: string,
    password: string,
    repeatPassword: string
  ) {
    if (password !== repeatPassword) {
      return null;
    }

    try {
      const hashPassword = this.hashString(password);
      const user = await this.prismaClient.user.create({
        data: { name, email, password: hashPassword },
      });
      return user;
    } catch {
      return null;
    }
  }

  public async auth(email: string, password: string) {
    const user = await this.prismaClient.user.findFirst({
      where: { email: email },
    });

    if (!user) {
      return null;
    }

    if (!this.verifyPassword(password, user.password)) {
      return null;
    }

    return user;
  }

  public async addFilm(userId: number, filmId: number) {
    try {
      await this.prismaClient.user.update({
        where: { id: userId },
        data: {
          films: {
            connect: {
              id: filmId,
            },
          },
        },
      });
      return true;
    } catch {
      return false;
    }
  }

  public async getUserFilms(userId: number) {
    const films = await this.prismaClient.film.findMany({
      where: { users: { some: { id: userId } } },
    });

    for (let index = 0; index < films.length; index++) {
      films[index].production_companies = JSON.parse(
        films[index].production_companies
      );
      films[index].production_countries = JSON.parse(
        films[index].production_countries
      );
    }
    return films;
  }

  public async getUserRecommeds(userId: number) {
    try {
      const userFilms = await this.getUserFilms(userId);
      const userFilmsId = userFilms.map((film) => film.id);
      const predictFilmsData = await axios.post<{ filmsId: number[] }>(
        `http://127.0.0.1:2001/get-recommend`,
        { filmsId: userFilmsId }
      );
      const predictFilms = await this.prismaClient.film.findMany({
        where: { id: { in: predictFilmsData.data.filmsId } },
      });

      // for (let index = 0; index < predictFilms.length; index++) {
      //   predictFilms[index].production_companies = JSON.parse(
      //     predictFilms[index].production_companies
      //   );
      //   predictFilms[index].production_countries = JSON.parse(
      //     predictFilms[index].production_countries
      //   );
      // }

      return predictFilms;
    } catch {
      return null;
    }
  }

  public async removeFilm(userId: number, filmId: number){
    try{
      await this.prismaClient.user.update({where: {id: userId}, data: {films: {delete: {id: filmId}}}})
      return true
    }catch{
      return false
    }
    // delete({where: {id: userId }, include: {films: {where: {id: filmId}}}})
  }

  public async getUser(userId: number) {
    return await this.prismaClient.user.findFirst({ where: { id: userId } });
  }

  private hashString(password: string) {
    return generate(password + process.env.SAIL);
  }

  private verifyPassword(password: string, hashPassword: string) {
    return verify(password + process.env.SAIL, hashPassword);
  }
}
