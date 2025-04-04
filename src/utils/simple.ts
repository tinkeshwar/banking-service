import { Boom } from "@hapi/boom";
import { PaginationMetaInterface } from "~/@types/common.dto";

export const ErrorIs = (error: string, code: number): Boom => {
  return new Boom(error, { statusCode: code });
}

export const paginationMetadata = (page: number, totalItems: number, perPage: number): PaginationMetaInterface => {
  return {  page, total: totalItems, perPage };
};