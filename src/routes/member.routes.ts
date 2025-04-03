
import Router from '@koa/router';
import { validateRequest } from '~/middlewares/validate.middleware';
import { Context } from 'koa';
import { addMemberSchema } from '~/validations/member.validation';
import { createMember } from '~/controllers/member.controller';

const router = new Router({
  prefix: '/member'
});

router.post('/', validateRequest(addMemberSchema), async (ctx: Context) => {
  const memberData = ctx.request.body as any;
  ctx.body = await createMember(memberData);
});

export default router;
