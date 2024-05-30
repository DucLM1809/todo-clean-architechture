import { RegisterDto } from '@app/api/dto/auth/register.dto';

export class RegisterCommand {
  constructor(public readonly register: RegisterDto) {}
}
