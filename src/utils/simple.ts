import { Boom } from "@hapi/boom";
import { PaginationMetaInterface } from "~/@types/common.dto";

export const ErrorIs = (error: string, code: number): Boom => {
  return new Boom(error, { statusCode: code });
}

export const paginationMetadata = (page: number, totalItems: number, perPage: number): PaginationMetaInterface => {
  const totalPages = Math.ceil(totalItems / perPage);
  
  return {  page, total: totalPages, perPage };
};