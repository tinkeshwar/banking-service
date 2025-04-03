import { MemberCreateRequestInterface } from "~/@types/member.dto";
import { createMemberWithAddresses, listAllMembers } from "~/repositories/member.repository";
import { createUserWithProfile } from "~/repositories/user.repository";
import { ErrorIs } from "~/utils/simple";

export const createMember = async (data: MemberCreateRequestInterface, userType: 'consumer' | 'employee' = 'consumer') => {
  try {
    const { addresses, ...memberData } = data;
    const { email, mobile, firstName, middleName, lastName, alternateNumber } = data;
    const user = await createUserWithProfile({ username: email, password: mobile }, {
      firstName, lastName, middleName, alternateNumber, email, mobile,
      userType,
      profileStatus: "inactive"
    });
    if(!user) throw ErrorIs('Member not created', 500);
    const member = await createMemberWithAddresses({ ...memberData, userId: user.id }, addresses);
    if(!member) throw ErrorIs('Member not created', 500);
    return member;
  } catch (error) {
    throw error;
  }
}

export const listMembers = async () => {
  try {
    return await listAllMembers();
  } catch (error) {
    throw error;
  }
}