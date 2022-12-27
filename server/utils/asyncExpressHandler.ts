import { NextFunction, Request, Response } from "express";

export function  asyncExpressHandler<TRequest, TResponse>(handler: (req, res) => Promise<void>) {
  return (req: Request, res: Response, next: NextFunction ) => {
    handler(req, res).catch(err => next(err))
  }
}