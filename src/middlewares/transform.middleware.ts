import { Context } from "koa";

const sensitive = ['deletedAt', 'password']

const transformKeys = (obj: Record<string, any> | any[] | null): Record<string, any> | any[] | null => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(item => transformKeys(item));

  return Object.keys(obj).reduce<Record<string, any>>((acc, key) => {
    if (sensitive.includes(key)) return acc;
    const value = obj[key];
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
    acc[snakeKey] = transformKeys(value);
    return acc;
  }, {});
};

const transformerMiddleware = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  await next();
  if (ctx.body) {
    try {
      ctx.body = transformKeys(JSON.parse(JSON.stringify(ctx.body)));
    } catch (error) {
      throw error;
    }
  }
};

export default transformerMiddleware;
