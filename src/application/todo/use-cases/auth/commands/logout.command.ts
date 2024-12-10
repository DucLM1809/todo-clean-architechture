import { LogoutDto } from '@app/api/dto/auth/logout.dto';

export class LogoutCommand {
  constructor(public readonly logout: LogoutDto) {}
}
