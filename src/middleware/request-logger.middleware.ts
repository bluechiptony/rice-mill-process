import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

export class RequestLoggerMiddleware implements NestMiddleware {
  private SERVICE_NAME: string = 'Request logger';
  private logger = new Logger(this.SERVICE_NAME);
  use(req: Request, res: Response, next: (error?: any) => void) {
    this.logger.log(`Incoming request: Path - ${req.method} : ${req.url}`);
    next();
  }
}
