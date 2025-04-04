import { MemberCreateRequestInterface } from "~/@types/member.dto";
import { createMemberWithAddresses, getMemberById, listAllMembers, updateMemberWithAddress } from "~/repositories/member.repository";
import { createUserWithProfile } from "~/repositories/user.repository";
import { ErrorIs, paginationMetadata } from "~/utils/simple";

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

export const updateMember = async (id: number, data: MemberCreateRequestInterface) => {
  try {
    const { addresses, ...memberData } = data;
    const member = await getMemberById(id);
    if(!member) throw ErrorIs('Member not found', 404);
    const updatedMember = await updateMemberWithAddress(memberData, addresses, id);
    if(!updatedMember) throw ErrorIs('Member not updated', 500);
    return updatedMember;
  } catch (error) {
    throw error;
  }
}

export const listMembers = async (page: number, records: number) => {
  try {
    const { count, rows } = await listAllMembers(page, records);
    if(!count) throw ErrorIs('Members not found', 404);
    return { rows, meta: paginationMetadata(page, count, records)};
  } catch (error) {
    throw error;
  }
}

export const getMember = async (id: number) => {
  try {
    const member = await getMemberById(id);
    if(!member) throw ErrorIs('Member not found', 404);
    return member;
  } catch (error) {
    throw error;
  }
}