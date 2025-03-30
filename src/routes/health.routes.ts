import Router from '@koa/router';
import { Context } from 'koa';
import { getHealth, getPing } from '~/controllers/health.controller';

const router = new Router({
  prefix: '/health'
});

router.get('/stats', async (ctx: Context) => {
  ctx.body = await getHealth();
});

router.get('/ping', async (ctx: Context) => {
  ctx.body = await getPing();
});

export default router;
