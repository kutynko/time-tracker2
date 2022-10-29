import { NextFunction, Request, Response } from "express";
import { BaseSchema } from "yup";

export function validate(
  prop: "body" | "params" | "query",
  schema: BaseSchema
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[prop];
    schema
      .validate(data, { abortEarly: false })
      .then((value) => {
        req[prop] = value;
        next();
      })
      .catch((error) => {
        req.log.warn({ data, error }, "validation failed");
        res.status(400).send(error.errors);
      });
  };
}