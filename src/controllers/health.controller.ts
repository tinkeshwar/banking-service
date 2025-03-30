import * as os from 'os';
import packageJSON from '../../package.json';
import { NODE_ENV } from '~/constants/variables';
import { HealthResponseInterface, PingResponseInterface } from '~/@types/health.dto';

export const getHealth = async (): Promise<HealthResponseInterface> => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
    os: {
      platform: os.platform(),
      type: os.type(),
      release: os.release(),
      uptime: os.uptime(),
      loadavg: os.loadavg(),
      totalmem: os.totalmem(),
      freemem: os.freemem(),
      cpus: os.cpus(),
    },
  }
  try {
    return health;
  } catch (error) {
    throw error;
  }
}

export const getPing = async (): Promise<PingResponseInterface> => {
  const ping = {
    status: 'ok',
    ping: 'pong',
    uptime: process.uptime(),
    message: 'OK',
    timestamp: new Date().toISOString(),
    version: packageJSON.version,
    environment: NODE_ENV
  };

  try {
    return ping;
  } catch (error) {
    throw error;
  }
}
