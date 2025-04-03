import { UserInterface, UserProfileInterface } from "~/@types/user.dto";
import { User } from "~/models/User";
import { UserProfile } from "~/models/UserProfile";

export const findByUsernameAndUserType = async(username: string, userType: string) => {
  return await User.findOne({ 
    where: { username },
    include: [{ model: UserProfile, where: { userType }, required: true }]
  });
}

export const createUserWithProfile = async(user: UserInterface, profile: UserProfileInterface) => {
  return await User.create({ ...user, profiles: [profile]}, { include: [UserProfile] });
}