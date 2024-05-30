import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from '../commands/refresh-token.command';
import { JwtTokenService } from '@app/infrastructure/services/jwt/jwt.service';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(private readonly jwtService: JwtTokenService) {}

  async execute(command: RefreshTokenCommand) {
    const { refreshToken } = command;

    const decode = await this.jwtService.verifyToken(
      refreshToken.refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    );

    return command;
  }
}
