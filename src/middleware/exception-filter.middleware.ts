import { ArgumentsHost, Catch, HttpException, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Exception } from '../exceptions';
import { Response } from 'express';

@Catch()
export default class ExceptionsFilter extends BaseExceptionFilter {
  catch(
    exception: HttpException | Exception | Error,
    host: ArgumentsHost,
  ): void {
    let status;
    let message;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof Exception) {
      status = exception.status;
      message = exception.message;
      Logger.error(exception.description, ExceptionsFilter.name);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else {
      Logger.error(exception.message, ExceptionsFilter.name);
    }

    response.status(status).json({
      statusCode: status,
      message: message,
    });
  }
}
