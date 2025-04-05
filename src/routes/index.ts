import Router from '@koa/router';
import healthRoutes from '~/routes/health.routes';
import authRoutes from '~/routes/auth.routes';
import userRoutes from '~/routes/user.routes';
import memberRoutes from '~/routes/member.routes';
import accountRoute from '~/routes/account.routes';

const router = new Router({
  prefix: '/api'
})

router.use(healthRoutes.routes());
router.use(userRoutes.routes());
router.use(authRoutes.routes());
router.use(memberRoutes.routes());
router.use(accountRoute.routes());

export default router;