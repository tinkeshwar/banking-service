import dotenv from 'dotenv';
dotenv.config();

export const PORT = Number(process.env.PORT || 5001);
export const NODE_ENV = process.env.NODE_ENV || 'dev';

export const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '15d'; 
export const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || '7d';

export const LOCAL_FILE_STORE_PATH = process.env.LOCAL_FILE_STORE_PATH || '';

export const DB_HOST = process.env.DB_HOST  || 'localhost';
export const DB_PORT = Number(process.env.DB_PORT || 3306);
export const DB_NAME = process.env.DB_NAME || 'database';
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';