import { NextFunction, Request, Response } from 'express';

export const wrapAsync = <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await fn(req, res, next).catch(next);

    return res.result.success({ json: result });
  };
};
