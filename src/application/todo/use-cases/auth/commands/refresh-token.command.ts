import { RefreshTokenDto } from '@app/api/dto/auth/refresh-token.dto';

export class RefreshTokenCommand {
  constructor(public readonly refreshToken: RefreshTokenDto) {}
}
