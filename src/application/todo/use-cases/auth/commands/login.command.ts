import { LoginDto } from '@app/api/dto/auth/login.dto';

export class LoginCommand {
  constructor(public readonly login: LoginDto) {}
}
