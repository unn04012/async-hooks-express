import { Request, RequestHandler } from 'express';
import { getLogger } from '../logger';

const writeAccessLog = ({ req, statusCode, success, error }: { req: Request; statusCode: number; success?: any; error?: any }) => {
  const logger = getLogger()();

  logger.accesssLog({
    url: req.url,
    method: req.method,
    body: req.body,
    qs: req.query,
    statusCode,
    error,
    response: {
      success,
      error,
    },
  });
};

export const responseOverrideMiddleware = (): RequestHandler => (req, res, next) => {
  res.result = {
    failure(payload) {
      res.locals.failure = payload;
      next();
    },
    success(payload) {
      res.locals.success = payload;
      next();
    },
  };
  res.locals.requestedAt = Date.now();
  next();
};

//TODO accessLoging 한번 더 고민
export const responsePostOverrideMiddleware = (): RequestHandler => {
  return (req, res, next) => {
    if (res.locals.success !== undefined) {
      const { json, text } = res.locals.success;
      const statusCode = 200;
      if (json) {
        res.status(200).json(json);
        writeAccessLog({ req, statusCode, success: json });
      } else {
        res.status(200).send(text);
        writeAccessLog({ req, statusCode, success: text });
      }
    } else if (res.locals.failure !== undefined) {
      const { json, text, status } = res.locals.failure;
      const statusCode = status ? status : 400;

      if (json) {
        res.status(statusCode).json(json);
        writeAccessLog({ req, statusCode, error: json });
      } else {
        res.status(statusCode).send(text);
        writeAccessLog({ req, statusCode, error: text });
      }
    } else {
      next();
    }
  };
};
