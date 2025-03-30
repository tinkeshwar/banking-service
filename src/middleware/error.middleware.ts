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
    }
  }

}

export default globalErrorMiddleware;
