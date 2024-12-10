import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../commands/login.command';
import exclude from '@app/core/utils/exclude';
import { ITokenRepository } from '@app/application/todo/repositories/tokenRepository.interface';
import { Token } from '@app/domain/todo/entities/token';
import {
  IJwtService,
  IJwtServicePayload,
} from '@app/application/common/adapters/jwt.interface';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { LoginResponseDto } from '@app/api/dto/auth/login.dto';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: LoginCommand): Promise<LoginResponseDto> {
    const { login } = command;

    const user = await this.userRepository.findByEmail(login.email);

    const payload: IJwtServicePayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateToken(payload);

    const saveToken = new Token({ userId: user.id, value: refreshToken });

    await this.tokenRepository.save(saveToken);

    this.publisher.mergeObjectContext(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
