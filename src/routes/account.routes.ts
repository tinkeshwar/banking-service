import Router from '@koa/router';
import { Context } from 'koa';
import { authenticateToken } from '~/middlewares/auth.middleware';
import { validateRequest } from '~/middlewares/validate.middleware';
import { createAccountSchema } from '~/validations/account.validation';

const router = new Router({
    prefix: '/accounts'
});

router.post('/',  authenticateToken, validateRequest(createAccountSchema), (ctx: Context) => {
    const { details, verification, nominees, ...account } = ctx.request.body as any;
    ctx.body = 'Account creation in progress.';
});

export default router;