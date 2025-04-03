import { MemberAddressInterface, MemberInterface } from "~/@types/member.dto"
import { Member } from "~/models/Member"
import { MemberAddress } from "~/models/MemberAddress"

export const createMemberWithAddresses = async (member: MemberInterface & { userId: number }, addresses: MemberAddressInterface[]): Promise<Member> => {
  return await Member.create({ ...member, addresses }, { include: [MemberAddress] });
}