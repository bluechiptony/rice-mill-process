import { UserDTO } from 'src/dto';

export interface BasicContact {
  phoneNumber: string;
  emailAddress: string;
}

export interface FullUserCreationDto {
  user: UserDTO;
  authentication: {
    active: boolean;
    role: string;
    password: string | undefined;
    has2fa: boolean;
  };
  userAuthVerification: {
    action: string;
    code: string;
    expiry: Date;
  };
}
