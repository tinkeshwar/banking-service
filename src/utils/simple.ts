import { Boom } from "@hapi/boom";

export const ErrorIs = (error: string, code: number): Boom => {
  return new Boom(error, { statusCode: code });
}