import Router from '@koa/router';
import { validateRequest } from '../middlewares/validate.middleware';
import { createUserSchema } from '../validations/user.validation';
import { authenticateToken } from '../middlewares/auth.middleware';
import { Context } from 'koa';
import { initialize } from '~/controllers/user.controller';

const router = new Router({
  prefix: '/users'
});

router.get('/initialize', async (ctx: Context) => {
  ctx.body = await initialize();
});

router.post('/', validateRequest(createUserSchema), (ctx: Context) => {
  const { user, profile } = ctx.request.body as any;
});

export default router;
