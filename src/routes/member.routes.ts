import Router from '@koa/router';
import { Context } from 'koa';
import { validateRequest } from '~/middlewares/validate.middleware';
import { authenticateToken } from '~/middlewares/auth.middleware';
import { addMemberSchema } from '~/validations/member.validation';
import { createMember, getMember, listMembers, updateMember } from '~/controllers/member.controller';

const router = new Router({
  prefix: '/member'
});

router.post('/', authenticateToken, validateRequest(addMemberSchema), async (ctx: Context) => {
  const memberData = ctx.request.body as any;
  ctx.body = await createMember(memberData);
});

router.get('/', authenticateToken, async (ctx: Context) => {
  const page = Number(ctx.query.page as string) || 1;
  const records = Number(ctx.query.records as string) || 10;
  ctx.body = await listMembers(page, records);
});

router.get('/:id', authenticateToken, async (ctx: Context) => {
  const { id } = ctx.params as any;
  ctx.body = await getMember(Number(id));
});

router.put('/:id', authenticateToken, validateRequest(addMemberSchema), async (ctx: Context) => {
  const { id } = ctx.params as any;
  const memberData = ctx.request.body as any;
  ctx.body = await updateMember(Number(id), memberData);
});
export default router;
