import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findByEmail(email);
    const isPasswordCorrect = await this.bcryptService.compare(
      password,
      user.password,
    );

    if (user && isPasswordCorrect) {
      return user;
    }

    return null;
  }
}
