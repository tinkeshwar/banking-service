import AuthService from '~/services/auth.service';
import { LoginResponseInterface, RefreshResponseInterface } from '~/@types/auth.dto';
import { ErrorIs } from '~/utils/simple';
import { findByUsernameAndUserType } from '~/repositories/user.repository';
import { UserInterface } from '~/@types/user.dto';

export const login = async (username: string, password: string, userType: string): Promise<LoginResponseInterface> => {
  try {
    const user = await findByUsernameAndUserType(username, userType) as UserInterface;
    if(!user) throw ErrorIs('User not found.', 404);
    return await AuthService.authenticateUser(user, password);
  } catch (error) {
    throw error;
  }
};

export const refresh = async (token: string): Promise<RefreshResponseInterface> => {
  try {
    return await AuthService.reAuthenticateUser(token);
  } catch (error) {
    throw error;
  }
};
