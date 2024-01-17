import { Injectable } from '@nestjs/common';
import { UserErrorMessages } from './user.error';

@Injectable()
export class ErrorMessages {
  User = UserErrorMessages;
  Authentication: any;
}
