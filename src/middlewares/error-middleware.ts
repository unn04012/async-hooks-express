import { NextFunction, Request, Response } from 'express';
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  //TODO event emit aws notification

  res.result.failure({
    status: 500,
    json: { code: '500', message: err.message },
  });
};
