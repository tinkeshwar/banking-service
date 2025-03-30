import Router from '@koa/router';
import healthRoutes from '~/routes/health.routes';
import authRoutes from '~/routes/auth.routes';
import userRoutes from '~/routes/user.routes';

const router = new Router({
  prefix: '/api'
})

router.use(healthRoutes.routes());
router.use(userRoutes.routes());
router.use(authRoutes.routes());

export default router;