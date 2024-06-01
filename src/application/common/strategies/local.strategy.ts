import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { IException } from '../exceptions/exceptions.interface';
import { ILogger } from '../logger/logger.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(username);
    const isPasswordCorrect = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (!user || !isPasswordCorrect) {
      this.exception.badRequestException({
        message: 'Invalid credentials',
      });
    }

    this.logger.log('LocalStrategy', 'User validated');

    return user;
  }
}
