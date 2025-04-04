import { Context, Next } from "koa";
import Boom from "@hapi/boom";
import logger from "~/utils/logger";

const globalErrorMiddleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: Error | unknown) {
    logger.error(err)
    if (Boom.isBoom(err)) {
      ctx.status = err.output.statusCode;
      ctx.body = {
        message: err.message,
        details: err.data || err.output.payload.error,
      };
    } else {
      ctx.status = 500;
      ctx.body = { message: 'Internal Server Error', details: err};
      if (err instanceof Error) {
        if(err.name === 'SequelizeUniqueConstraintError'){
          ctx.status = 409;
          ctx.body = { message: 'Duplicate entry', details: err.message};
        }
        if(err.name === 'TokenExpiredError'){
          ctx.status = 401;
          ctx.body = { message: 'Token expired', details: err.message};
        }
      }
    }
  }

}

export default globalErrorMiddleware;
