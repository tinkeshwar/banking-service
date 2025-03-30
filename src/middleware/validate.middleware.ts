import { Context, Next } from 'koa';
import { ObjectSchema } from 'joi';

/**
 * Middleware to validate the request body against a Joi schema.
 * If validation fails, it sends a 400 response with error details.
 * If validation passes, it moves to the next middleware.
 * 
 * @param {ObjectSchema} schema - The Joi schema used for validation
 * @returns {Function} - The middleware function that validates the request
 */
export const validateRequest = (schema: ObjectSchema) => async (ctx: Context, next: Next): Promise<void> => {
  const { error } = schema.validate(ctx.request.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    ctx.status = 400;
    ctx.body = { errors };
  } else {
    // Convert request body keys to camel case
    const toCamelCase = (str: string) => str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    const convertKeys = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(convertKeys);
      }
      if (obj && typeof obj === 'object') {
        return Object.keys(obj).reduce((acc, key) => {
          acc[toCamelCase(key)] = convertKeys(obj[key]);
          return acc;
        }, {} as any);
      }
      return obj;
    };
    ctx.request.body = convertKeys(ctx.request.body);
    await next();
  }
};
