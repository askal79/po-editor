import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import { GlobalResponseError } from './global.response.error';
import { ValidationException } from '@app/shared/exception/validation.exception';

@Catch()
export class TypeormExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let errors = (exception as any).message.message;
    let code = 'HttpException';
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    // console.log('555', exception);

    switch (exception.constructor) {
      case ValidationException: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        errors = (exception as any).messages?.errors;
        break;
      case HttpException:
        status = (exception as HttpException).getStatus();
        errors = [
          (exception as any).response?.errors ||
            (exception as any).response?.message,
        ];
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        errors = [
          (exception as any)?.detail.replace(
            /^Key \((.*)\)=\((.*)\) (.*)/,
            "This '$1' - '$2' already exists.",
          ),
        ];
        // code = (exception as any).code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        errors = [(exception as EntityNotFoundError).message];
        // code = (exception as any).code;
        break;

      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        errors = [(exception as CannotCreateEntityIdMapError).message];
        // code = (exception as any).code;
        break;
      case NotFoundException: // and another
        status = HttpStatus.NOT_FOUND;
        errors = [(exception as NotFoundException).message];
        // code = (exception as any).status;
        break;
      case UnauthorizedException: // and another
        status = HttpStatus.UNAUTHORIZED;
        errors = ['please authorize in application'];
        code = (exception as any).status;
        break;
      case ForbiddenException: // and another
        status = HttpStatus.FORBIDDEN;
        errors = [{ message: 'forbidden by application guard' }];
        code = (exception as any).status;
        break;
      default:
        status = (exception as any).status;
        errors = [(exception as any).message] || [
          (exception as any).response?.errors ||
            (exception as any).response?.message,
        ];
      // code = (exception as any).code;
    }

    response
      .status(status)
      .json(GlobalResponseError(status, errors, code, request));
  }
}
