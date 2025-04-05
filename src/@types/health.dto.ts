import { CpuInfo } from "os";

export interface OSDetailInterface {
  platform: string;
  type: string;
  release: string;
  uptime: number;
  loadavg: number[];
  totalmem: number;
  freemem: number;
  cpus: CpuInfo[];
}
export interface BaseHealthInterface {
  status: string;
  timestamp: string;
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
  os: OSDetailInterface;
}

export interface BasePingInterface {
  status: string;
  ping: string;
  uptime: number;
  message: string;
  timestamp: string;
  version: string;
  environment: string;
}

export interface HealthResponseInterface extends BaseHealthInterface {}
export interface PingResponseInterface extends BasePingInterface {}