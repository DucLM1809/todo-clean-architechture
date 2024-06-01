import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../repositories/userRepository.interface';
import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';
import { IException } from '@app/application/common/exceptions/exceptions.interface';
import { ILogger } from '@app/application/common/logger/logger.interface';
import { User } from '@app/domain/todo/entities/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly exception: IException,
    private readonly logger: ILogger,
  ) {}

  async validateUser(email: string, password?: string): Promise<User> {
    this.logger.log('Authentication Validate User: ', email);

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      this.logger.warn('Authentication Failed With User: ', email);
      this.exception.badRequestException({
        message: 'Invalid credentials',
      });
    }

    if (password) {
      const isPasswordCorrect = await this.bcryptService.compare(
        password,
        user.password,
      );

      if (!isPasswordCorrect) {
        this.logger.warn(
          'Authentication Failed With Wrong Password Of User: ',
          email,
        );
        this.exception.badRequestException({
          message: 'Invalid credentials',
        });
      }
    }

    return user;
  }
}
