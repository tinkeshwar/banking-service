export interface AuthPayloadInterface {
  userId: number;
}

export interface LoginResponseInterface {
  accessToken: string;
  refreshToken: string;
}