import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, JWT_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from '~/constants/variables';
import { AuthPayloadInterface } from '~/@types/auth.dto';
import { ErrorIs } from '~/utils/simple';
import { UserInterface } from '~/@types/user.dto';

class AuthService {
  private static instance: AuthService;

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Generate a JWT Token
   * @param {number} userId - The user's ID to include in the token payload.
   * @param {string} expiration - Token expiration time.
   * @returns {string} - The generated JWT Token.
   */
  private generateToken(userId: number, expiration: string): string {
    if (!JWT_SECRET) {
      throw ErrorIs('JWT_SECRET is not set', 500)
    }
    const payload: AuthPayloadInterface = { userId };
    return JWT.sign(payload, JWT_SECRET as JWT.Secret, { expiresIn: expiration } as JWT.SignOptions);
  }

  /**
   * Generate Access Token
   * @param {number} userId - The user's ID.
   * @returns {string} - The generated JWT Access Token.
   */
  private generateAccessToken(userId: number): string {
    return this.generateToken(userId, JWT_EXPIRATION);
  }

  /**
   * Generate Refresh Token
   * @param {number} userId - The user's ID.
   * @returns {string} - The generated JWT Refresh Token.
   */
  private generateRefreshToken(userId: number): string {
    return this.generateToken(userId, REFRESH_TOKEN_EXPIRATION);
  }

  /**
   * Verify a JWT Token
   * @param {string} token - The JWT Token to verify.
   * @returns {AuthPayloadInterface} - Decoded payload if valid.
   * @throws {Error} - If the token is invalid or expired.
   */
  private verifyToken(token: string): AuthPayloadInterface {
    if (!JWT_SECRET) {
      throw ErrorIs('JWT_SECRET is not set', 500);
    }
    const payload = JWT.verify(token, JWT_SECRET) as AuthPayloadInterface;
    if (typeof payload !== 'object') {
      throw ErrorIs('JWT payload is not an object', 500)
    }
    if (!payload.userId) {
      throw ErrorIs('Invalid or expired token', 422)
    }
    return payload;
  }
  
  /**
   * Compare a plain text password with a hashed password
   * @param {string} password - The plain text password.
   * @param {string} hashedPassword - The hashed password.
   * @returns {boolean} - True if the passwords match, false otherwise.
   */
  private comparePassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }

  /**
   * Authenticate a user with their password
   * @param {UserInterface} user - The user object from the database
   * @param {string} password - The password to verify
   * @returns {{accessToken: string, refreshToken: string, user: UserInterface}} - Object containing generated tokens if authentication successful
   * @throws {Error} - If authentication fails
   */
  private authenticateUser(user: UserInterface, password: string): {user: UserInterface, accessToken: string, refreshToken: string} {
    const isPasswordValid = this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw ErrorIs('Incorrect password.', 422);
    }

    const accessToken = this.generateAccessToken(user.id);
    const refreshToken = this.generateRefreshToken(user.id);

    return {
      accessToken,
      refreshToken,
      user
    };
  }
  
  /**
   * Static method to generate an access token for a user
   * @param {number} userId - The user's ID
   * @returns {Promise<string>} Promise that resolves to the generated access token
   */
  static async generateAccessToken(userId: number): Promise<string> {
    return this.getInstance().generateAccessToken(userId);
  }

  /**
   * Static method to generate a refresh token for a user
   * @param {number} userId - The user's ID
   * @returns {Promise<string>} Promise that resolves to the generated refresh token
   */
  static async generateRefreshToken(userId: number): Promise<string> {
    return this.getInstance().generateRefreshToken(userId);
  }

  /**
   * Static method to verify a JWT token
   * @param {string} token - The token to verify
   * @returns {Promise<AuthPayloadInterface>} Promise that resolves to the decoded token payload
   */
  static async verifyToken(token: string): Promise<AuthPayloadInterface> {
    return this.getInstance().verifyToken(token);
  }

  /**
   * Static method to authenticate a user
   * @param {UserInterface} user - The user object from the database
   * @param {string} password - The password to verify
   * @returns {Promise<{accessToken: string, refreshToken: string, user: UserInterface}>} - Object containing generated tokens if authentication successful
   */
  static async authenticateUser(user: UserInterface, password: string): Promise<{user: UserInterface, accessToken: string, refreshToken: string}> {
    return this.getInstance().authenticateUser(user, password);
  }

  /**
   * Refresh authentication tokens using a refresh token
   * @param {string} refreshToken - The refresh token to verify and use for re-authentication
   * @returns {Promise<{accessToken: string, refreshToken: string}>} New access and refresh tokens
   * @throws {Error} If refresh token is invalid or expired
   */
  static async reAuthenticateUser(refreshToken: string): Promise<{accessToken: string, refreshToken: string}> {
    const instance = this.getInstance();
    const payload = instance.verifyToken(refreshToken);
    if(!payload){
      throw ErrorIs('Invalid or expired refresh token', 422);
    }
    const newAccessToken = instance.generateAccessToken(payload.userId);
    const newRefreshToken = instance.generateRefreshToken(payload.userId);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,

    };
  }
}

export default AuthService;