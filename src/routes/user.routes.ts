import Router from '@koa/router';
import { validateRequest } from '../middleware/validate.middleware';
import { createUserSchema } from '../validation/user.validation';
import { authenticateToken } from '../middleware/auth.middleware';
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
