import { BaseMemberAddressInterface, BaseMemberInterface, MemberCreateRequestInterface, MemberResponseInterface } from "~/@types/member.dto"
import { Member } from "~/models/Member"
import { MemberAddress } from "~/models/MemberAddress"
import { User } from "~/models/User";
import { UserProfile } from "~/models/UserProfile";
import sequelize from "~/utils/database";

export const createMemberWithAddresses = async (member: BaseMemberInterface & { userId: number }, addresses: BaseMemberAddressInterface[]): Promise<MemberResponseInterface> => {
  return await Member.create({ ...member, addresses }, { include: [MemberAddress] }) as MemberResponseInterface;
}

export const createMemberWithUser = async (data: MemberCreateRequestInterface, userType: string): Promise<MemberResponseInterface> => {
  const { addresses, ...memberData } = data;
  const { email, mobile, firstName, middleName, lastName, alternateNumber } = data;
  
  const result = await sequelize.transaction(async (t: any) => {
    const user = await User.create({ 
      username: email, 
      password: mobile, 
      profiles: [{email, mobile, firstName, middleName, lastName, alternateNumber, userType}]
    }, { 
      include: [UserProfile],
      transaction: t 
    });

    return await Member.create({ 
      ...memberData, 
      userId: user.id, 
      addresses 
    }, { 
      include: [MemberAddress],
      transaction: t 
    });
  });

  return result as MemberResponseInterface;
}

export const updateMemberWithAddress = async (member: BaseMemberInterface, addresses: BaseMemberAddressInterface[], memberId: number): Promise<Boolean> => {
  // TODO: It need improvement in logic (Priority 3).
  const mappedAddresses = addresses.map((address) => { return { ...address, memberId }});
  await MemberAddress.destroy({ where: { memberId } });
  await MemberAddress.bulkCreate(mappedAddresses);
  await Member.update(member, { where: { id: memberId } });
  return true
}

export const listAllMembers = async (page: number = 1, perPage: number = 10) => {
  return await Member.findAndCountAll({ 
    include: [MemberAddress],
    offset: (page - 1) * perPage,
    limit: perPage,
    distinct: true
  });
}

export const getMemberById = async (id: number): Promise<MemberResponseInterface> => {
  return await Member.findByPk(id, {
    include: [MemberAddress]
  }) as MemberResponseInterface;
}