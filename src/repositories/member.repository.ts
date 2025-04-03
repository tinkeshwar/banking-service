import { MemberAddressInterface, MemberInterface } from "~/@types/member.dto"
import { Member } from "~/models/Member"
import { MemberAddress } from "~/models/MemberAddress"

export const createMemberWithAddresses = async (member: MemberInterface & { userId: number }, addresses: MemberAddressInterface[]): Promise<Member> => {
  return await Member.create({ ...member, addresses }, { include: [MemberAddress] });
}

export const updateMemberWithAddress = async (member: MemberInterface, addresses: MemberAddressInterface[], memberId: number): Promise<Boolean> => {
  await MemberAddress.destroy({ where: { memberId } });
  const mappedAddresses = addresses.map((address) => { return { ...address, memberId }});
  await MemberAddress.bulkCreate(mappedAddresses);
  await Member.update(member, { where: { id: memberId } });
  return true
}

export const listAllMembers = async (page: number = 1, perPage: number = 10) => {
  return await Member.findAndCountAll({ 
    include: [MemberAddress],
    offset: (page - 1) * perPage,
    limit: perPage
  });
}

export const getMemberById = async (id: number) => {
  return await Member.findByPk(id, {
    include: [MemberAddress]
  });
}