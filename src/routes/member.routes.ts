import Router from '@koa/router';
import { validateRequest } from '~/middlewares/validate.middleware';
import { Context } from 'koa';
import { addMemberSchema } from '~/validations/member.validation';
import { createMember, listMembers } from '~/controllers/member.controller';
import { authenticateToken } from '~/middlewares/auth.middleware';

const router = new Router({
  prefix: '/member'
});

router.post('/', authenticateToken, validateRequest(addMemberSchema), async (ctx: Context) => {
  const memberData = ctx.request.body as any;
  ctx.body = await createMember(memberData);
});

router.get('/', authenticateToken, async (ctx: Context) => {
  ctx.body = await listMembers();
});

export default router;
