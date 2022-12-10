import BaseService from "./BaseService";
import { Film, Genres } from "@prisma/client";

type RequestParamsType = {
  genres?: { some: { id: { in: Array<number> } } };
  ru_title?: { search: string };
  vote_average: { gt: number }
  release_date: { gte: Date , lte: Date}
};

export default class FilmService extends BaseService {


  public async getFilms(
    take = 5,
    skip = 0,
    genres = [] as number[],
    text = "",
    raiting = 0,
    startDate = new Date("1.1.1001"),
    endData = new Date("1.1.2201")
  ) {

    let allFilms = [] as Film[];

    const requestParams: RequestParamsType = {vote_average: { gt: (raiting || 0) }, release_date: { gte: startDate , lte: endData}};

    if (genres.length > 0) {
      requestParams["genres"] = { some: { id: { in: genres } } };
    }
    if (text.length > 0) {
      requestParams["ru_title"] = { search: text };
    }

    allFilms = await this.prismaClient.film.findMany({
      include: { genres: true },
      where: requestParams,
      skip: skip,
      take: take,
    });

    for (let index = 0; index < allFilms.length; index++) {
      allFilms[index].production_companies = JSON.parse(
        allFilms[index].production_companies
      );
      allFilms[index].production_countries = JSON.parse(
        allFilms[index].production_countries
      );
    }

    return allFilms;
  }
  // id,name
  public async getUniqueGenres() {
    const genres = await this.prismaClient.genres.findMany();
    return genres;
  }

  public async getMinMaxDate(){
    const maxDate = await this.prismaClient.film.aggregate({_max: { release_date: true }})
    const minDate = await this.prismaClient.film.aggregate({_min: { release_date: true }})

    return {maxDate: maxDate._max.release_date, minDate: minDate._min.release_date}
  }
}
