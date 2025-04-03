import { Context, Next } from 'koa';
import AuthService from '~/services/auth.service';
import { ErrorIs } from '~/utils/simple';

/**
 * Middleware to check for a valid access token.
 * @param {Context} ctx - The Koa context object.
 * @param {Next} next - The next middleware function to pass control to.
 * @returns {Promise<void>} - Calls the next middleware if the token is valid, otherwise sets 403 status.
 */
export const authenticateToken = async (ctx: Context, next: Next): Promise<void> => {
  const token = ctx.headers['authorization']?.split(' ')[1];

  if (!token) {
    throw ErrorIs('Access token is required', 403);
  }
  const decoded = await AuthService.verifyToken(token) as unknown as { userId: string};
  if (decoded && decoded.userId) {
    await next();
  } else {
    throw ErrorIs('Invalid or expired access token', 403);
  }
};
