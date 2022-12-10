import BaseRouter, { RouterConfig, ValidateType } from "./BaseRouter";
import { Request, Response, NextFunction } from "express";
import FilmService from "../services/FilmService";

type GetFilmQueryParams = {
  take?: string;
  skip?: string;
  filter?: FilterType;
};

type FilterType = {
  genres: string[];
  raiting: string;
  name: string;
  startDate: string,
  endDate: string
};

const getFilmsQueryValidate: ValidateType<GetFilmQueryParams>[] = [
  { key: "take", pattern: /^[0-9]\d*$/ },
  { key: "skip", pattern: /^[0-9]\d*$/ },
];

export default class FilmRouter extends BaseRouter {
  private userService: FilmService;

  constructor() {
    super();
    this.userService = new FilmService();
  }

  protected async films(
    req: Request<any, any, any, GetFilmQueryParams, any>,
    res: Response
  ) {
    const filData = await this.userService.getFilms(
      Number(req.query.take),
      Number(req.query.skip),
      req.query.filter?.genres?.map(Number),
      req.query.filter?.name,
      Number(req.query.filter?.raiting),
      new Date((req.query.filter?.startDate || "1.1.1001")),
      new Date((req.query.filter?.endDate || "1.1.2201")),
    );
    // console.log(req.query.filter?.genres);

    res.send(JSON.stringify(filData));
  }

  protected async filmGenres(
    req: Request<any, any, any, any, any>,
    res: Response
  ) {
    const filData = await this.userService.getUniqueGenres();
    res.send(JSON.stringify(filData));
  }

  protected async filmDate(req: Request,res: Response){
    const filData = await this.userService.getMinMaxDate();
    res.send(JSON.stringify(filData));
  }

  protected getRouterConfig(): RouterConfig[] {
    return [
      {
        method: "get",
        path: "/films",
        handler: this.films.bind(this),
        middleware: [
          this.validateRequest<GetFilmQueryParams>(
            getFilmsQueryValidate,
            "query"
          ).bind(this),
        ],
      },
      {
        method: "get",
        path: "/genres",
        handler: this.filmGenres.bind(this),
        middleware: [],
      },

      {
        method: "get",
        path: "/date",
        handler: this.filmDate.bind(this),
        middleware: [],
      },
      //   {
      //     method: "post",
      //     path: "/auth-email",
      //     handler: this.auth.bind(this),
      //     middleware: [
      //       this.validateBody<AuthEmain>(authEmainValidate).bind(this),
      //     ],
      //   },
    ];
  }
}
