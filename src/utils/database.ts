import { Sequelize } from 'sequelize-typescript';
import logger from '~/utils/logger';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '~/constants/variables';
import dotenv from 'dotenv';
dotenv.config();

const mySql = {
  dialect: 'mysql' as const,
  host: DB_HOST,
  port: DB_PORT,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  models: [__dirname + '/../models'],
  migrationStorage: 'sequelize',
  migrationStorageTableName: 'sequelize_migrations',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_seeders',
  
  pool: {
    max: 10, // Increased for better concurrency
    min: 2,  // Maintain minimum connections
    acquire: 60000, // Increased timeout for high load
    idle: 10000
  },
  
  dialectOptions: {
    connectTimeout: 60000,
    timezone: '+05:30'
  }
}

export const development = {
  ...mySql,
  database: DB_NAME || 'dev',
  logging: (sql: string) => logger.info(sql),
};

export const production = {
  ...mySql,
  database: DB_NAME || 'production',
  logging: false,
  pool: {
    ...mySql.pool,
    max: 20
  }
};


const config = {
  development,
  production
}

/**
 * Initializes the Sequelize instance to connect to a MySQL database.
 * Configuration is environment-dependent and includes optimized connection pooling.
 * 
 * @class sequelize
 * @type {Sequelize}
 */
const sequelize: Sequelize = new Sequelize(
  config[NODE_ENV === 'production' ? 'production' : 'development']
);

export default sequelize;

