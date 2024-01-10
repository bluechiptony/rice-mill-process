import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Response } from 'express';
import { Exception } from 'src/exceptions';

@Catch(Exception)
export class NanoscaleExceptionFilter implements ExceptionFilter {
  private logger = new Logger(NanoscaleExceptionFilter.name);

  catch(exception: Exception, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    this.logger.error(exception.description);
    response.status(exception.status).json({
      message: exception.message,
    });
  }
}
