import Router from '@koa/router';
import { validateRequest } from '../middlewares/validate.middleware';
import { createUserSchema } from '../validations/user.validation';
import { Context } from 'koa';

const router = new Router({
  prefix: '/users'
});

router.post('/', validateRequest(createUserSchema), (ctx: Context) => {
  const { user, profile } = ctx.request.body as any;
});

export default router;
