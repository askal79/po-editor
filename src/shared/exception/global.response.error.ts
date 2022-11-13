import { Request } from 'express';
import { ResponseError } from '@app/shared/types/response.error';

export const GlobalResponseError: (
  statusCode: number,
  errors: string[],
  code: string,
  request: Request,
) => ResponseError = (
  statusCode: number,
  errors: string[],
  code: string,
  request: Request,
): ResponseError => {
  return {
    statusCode: statusCode,
    errors,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};
