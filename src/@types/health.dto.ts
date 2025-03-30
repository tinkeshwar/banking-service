import { CpuInfo } from "os";

export interface HealthResponseInterface {
  status: string;
  timestamp: string;
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
  os: {
    platform: string;
    type: string;
    release: string;
    uptime: number;
    loadavg: number[];
    totalmem: number;
    freemem: number;
    cpus: CpuInfo[];
  };
}

export interface PingResponseInterface {
  status: string;
  ping: string;
  uptime: number;
  message: string;
  timestamp: string;
  version: string;
  environment: string;
}
