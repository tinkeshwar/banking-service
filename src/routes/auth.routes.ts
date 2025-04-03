import Router from '@koa/router';
import { login, refresh } from '~/controllers/auth.controller';
import { validateRequest } from '~/middlewares/validate.middleware';
import { loginSchema, refreshTokenSchema } from '../validations/auth.validation';
import { Context } from 'koa';

const router = new Router({
  prefix: '/auth'
});

router.post('/login', validateRequest(loginSchema), async (ctx: Context) => {
  const { username, password, userType } = ctx.request.body as any;
  ctx.body = await login(username, password, userType);
});

router.post('/refresh-token', validateRequest(refreshTokenSchema), async (ctx: Context) => {
  const { token } = ctx.request.body as any;
  ctx.body = await refresh(token);
});

export default router;
