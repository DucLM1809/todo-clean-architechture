import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../commands/login.command';
import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';
import exclude from '@app/core/utils/exclude';
import { ITokenRepository } from '@app/application/todo/repositories/tokenRepository.interface';
import { Token } from '@app/domain/todo/entities/token';
import { IJwtService } from '@app/application/common/adapters/jwt.interface';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly bcryptService: IBcryptService,
    private readonly jwtService: IJwtService,
    private readonly userRepository: IUserRepository,
    private readonly tokenRepository: ITokenRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: LoginCommand) {
    const { login } = command;

    const user = await this.userRepository.findByEmail(login.email);
    // const isPasswordCorrect = await this.bcryptService.compare(
    //   login.password,
    //   user.password,
    // );

    // if (!user || !isPasswordCorrect) {
    //   this.exception.badRequestException({
    //     message: 'Invalid credentials',
    //   });
    // }

    const payload = {
      userId: user.id,
    };

    const accessToken = this.jwtService.generateToken(
      payload,
      process.env.JWT_SECRET,
      process.env.JWT_EXPIRATION_TIME,
    );
    const refreshToken = this.jwtService.generateToken(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );

    const saveToken = new Token({ userId: user.id, value: refreshToken });

    await this.tokenRepository.save(saveToken);

    this.publisher.mergeObjectContext(user);

    return exclude({ ...login, accessToken, refreshToken }, ['password']);
  }
}
