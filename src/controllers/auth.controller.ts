import AuthService from '~/services/auth.service';
import { LoginResponseInterface } from '~/@types/auth.dto';
import { ErrorIs } from '~/utils/simple';
import { findByUsernameAndUserType } from '~/repositories/user.repository';

export const login = async (username: string, password: string, userType: string): Promise<LoginResponseInterface> => {
  try {
    const user = await findByUsernameAndUserType(username, userType)
    if(!user) throw ErrorIs('User not found.', 404);
    return await AuthService.authenticateUser(user, password);
  } catch (error) {
    throw error;
  }
};

export const refresh = async (token: string): Promise<LoginResponseInterface> => {
  try {
    return await AuthService.reAuthenticateUser(token);
  } catch (error) {
    throw error;
  }
};
