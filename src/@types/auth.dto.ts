import { UserInterface } from "~/@types/user.dto";

export interface AuthPayloadInterface {
  userId: number;
}
export interface BaseResponseInterface {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseInterface extends BaseResponseInterface {
  user: UserInterface;
}

export interface RefreshResponseInterface extends BaseResponseInterface {}