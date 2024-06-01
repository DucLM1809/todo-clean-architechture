import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exception: ExceptionsService,
    private readonly logger: LoggerService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<any> {
    this.logger.debug('LocalStrategy.validate', username);
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

    return user;
  }
}
