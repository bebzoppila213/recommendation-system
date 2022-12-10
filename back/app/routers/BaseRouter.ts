import { Router, Request, Response, NextFunction } from "express";
import { sign, verify } from "jsonwebtoken";

export type RouterMidlwareType = (
  req: Request<any, any, any, any, any>,
  res: Response,
  next: NextFunction
) => void;

export type RouterConfig = {
  method: "get" | "post";
  path: string;
  handler: (req: Request<any, any, any, any, any>, res: Response) => void;
  middleware: RouterMidlwareType[];
};

export type ValidateType<T> = {
  key: keyof T;
  pattern: RegExp;
};

export default abstract class BaseRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public getRouter() {
    return this.router;
  }

  private init() {
    const routerConfig = this.getRouterConfig();

    routerConfig.forEach((routerItem) => {
      this.router[routerItem.method](routerItem.path, [
        ...routerItem.middleware,
        routerItem.handler,
      ]);
    });
  }

  protected validateRequest<T extends object>(validate: ValidateType<T>[], requestKey: 'body' | 'query' = 'body') {
    const validateData = validate;
    
    return (
      req: Request<any, any, T, any, any>,
      res: Response,
      next: NextFunction
    ) => {
      const resultValidate = validateData.every((valid) =>
        valid.pattern.test(String(req[requestKey][valid.key]))
      );
      if (resultValidate) {
        next();
      } else {
        this.sendFail(res, "Ошибка при вводе данных")
      }
    };
  }

  protected authorization(req: Request, res: Response, next: NextFunction){
    
    
    const token = req.headers.authorization?.split(" ")[1]
    // console.log(token);
    if(token === undefined){
      this.sendFail(res)
      return null
    }
    try{
      const userData = verify(token, String(process.env.PRIVATE_KEY)) as { userId: number, iat: number, exp: number }
      req.body.userId = userData.userId
      next()
    }catch{
      console.log("www");
      this.sendFail(res, 'Не удалось пройти авторизацию')
    }
  }


  protected sendFail(res: Response, messages = "Произошла ошибка", data?: any) {
    res.status(400).send(JSON.stringify({ messages: messages, ok: false, data}));
  }

  protected sendOk(res: Response, messages = "Всё хорошо", data?: any){
    res.status(200).send(JSON.stringify({ messages: messages, ok: true, data }));
  }

  protected sendCreate(res: Response, messages = "Создана запись", data?: any){
    res.status(201).send(JSON.stringify({ messages: messages, ok: true, data }));
  }

  protected abstract getRouterConfig(): RouterConfig[];
}
