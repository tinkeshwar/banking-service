import { User } from '~/models/User';
import { UserProfile } from '~/models/UserProfile';

export const initialize = async (): Promise<string> => {
  const userData = await import('~/data/users.json');
  try {
    await User.create({...userData}, { include: [UserProfile]})
    return 'Users generated successfully.'
  } catch (error) {
    throw error;
  }
}

export const getUsers = async (): Promise<void> => {
  
};

export const createUser = async (): Promise<void> => {
  
};
