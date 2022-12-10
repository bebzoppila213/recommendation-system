import BaseRouter, { RouterConfig, ValidateType } from "./BaseRouter";
import { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";
import { sign, verify } from "jsonwebtoken";

type RegisterBody = {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
};

type AuthEmain = {
  email: string;
  password: string;
};

type FilmUserIdBydy = {
  filmId: number;
  userId: number;
};

type UserDataType = {
  userId: number;
};

const registerBodyValidate = [
  { key: "repeatPassword", pattern: /.{3,}/ },
  { key: "name", pattern: /.{3,}/ },
  { key: "email", pattern: /.{3,}@.{3,}/ },
  { key: "password", pattern: /.{3,}/ },
] as ValidateType<RegisterBody>[];

const authEmainValidate = [
  { key: "email", pattern: /.{3,}@.{3,}/ },
  { key: "password", pattern: /.{3,}/ },
] as ValidateType<AuthEmain>[];

export default class UserRouter extends BaseRouter {
  private userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  private async auth(
    req: Request<any, any, AuthEmain, any, any>,
    res: Response
  ) {
    const authResult = await this.userService.auth(
      req.body.email,
      req.body.password
    );
    if (authResult !== null) {
      const token = sign(
        { userId: authResult.id },
        String(process.env.PRIVATE_KEY),
        { expiresIn: 60 * 60 }
      );
      this.sendOk(res, "Регистрация прошла успешно", {
        token: token,
        name: authResult.name,
      });
    } else {
      this.sendFail(res);
    }
  }

  private async register(
    req: Request<any, any, RegisterBody, any, any>,
    res: Response
  ) {
    const registerResult = await this.userService.register(
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.repeatPassword
    );

    if (registerResult !== null) {
      const token = sign(
        { userId: registerResult.id },
        String(process.env.PRIVATE_KEY),
        { expiresIn: 60 * 60 }
      );
      this.sendOk(res, "Регистрация прошла успешно", { token: token });
    } else {
      this.sendFail(res);
    }
  }

  private async addFilm(
    req: Request<any, any, FilmUserIdBydy, any>,
    res: Response
  ) {
    const resultAdd = await this.userService.addFilm(
      req.body.userId,
      req.body.filmId
    );
    if (resultAdd) {
      this.sendCreate(res);
    } else {
      this.sendFail(res);
    }
  }

  private async removeFilm(
    req: Request<any, any, FilmUserIdBydy, any>,
    res: Response
  ) {
    const resulDelite = await this.userService.removeFilm(
      req.body.userId,
      req.body.filmId
    );
    if (resulDelite) {
      this.sendOk(res);
    } else {
      this.sendFail(res);
    }
  }

  private async userData(
    req: Request<any, any, UserDataType, any>,
    res: Response
  ) {
    const userInfo = await this.userService.getUser(req.body.userId);
    if (userInfo) {
      this.sendOk(res, "Регистрация прошла успешно", userInfo);
    } else {
      this.sendFail(res);
    }
  }

  private async getUserFilms(
    req: Request<any, any, UserDataType, any>,
    res: Response
  ) {
    const films = await this.userService.getUserFilms(req.body.userId);

    this.sendOk(res, "", films);
    // res.send(`awdawd`)
  }

  private async getUserRecommends(
    req: Request<any, any, UserDataType, any>,
    res: Response
  ) {
    const predictFilms = await this.userService.getUserRecommeds(
      req.body.userId
    );
    if (predictFilms) {
      this.sendOk(res, "", predictFilms);
    } else {
      // console.log(123);

      this.sendFail(res);
    }

    // res.send('awdawd')
  }

  protected getRouterConfig(): RouterConfig[] {
    return [
      {
        method: "post",
        path: "/register",
        handler: this.register.bind(this),
        middleware: [
          this.validateRequest<RegisterBody>(registerBodyValidate).bind(this),
        ],
      },
      {
        method: "post",
        path: "/auth-email",
        handler: this.auth.bind(this),
        middleware: [
          this.validateRequest<AuthEmain>(authEmainValidate).bind(this),
        ],
      },

      {
        method: "post",
        path: "/user-data",
        handler: this.userData.bind(this),
        middleware: [this.authorization.bind(this)],
      },
      {
        method: "post",
        path: "/user-recommends",
        handler: this.getUserRecommends.bind(this),
        middleware: [this.authorization.bind(this)],
      },
      {
        method: "post",
        path: "/add-film",
        handler: this.addFilm.bind(this),
        middleware: [this.authorization.bind(this)],
      },
      {
        method: "post",
        path: "/remove-film",
        handler: this.removeFilm.bind(this),
        middleware: [this.authorization.bind(this)],
      },
      {
        method: "post",
        path: "/films",
        handler: this.getUserFilms.bind(this),
        middleware: [this.authorization.bind(this)],
      },
    ];
  }
}
