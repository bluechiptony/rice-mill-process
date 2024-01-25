import { ROLE } from 'src/types/data.type';

export class CreateAuthenticationDto {
  id: string;
  userId: string;
  password: string;
  active: boolean;
  has2fa: boolean;
  role: ROLE;
}
