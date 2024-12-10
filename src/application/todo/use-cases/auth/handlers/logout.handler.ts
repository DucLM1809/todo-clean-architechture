import { CommandHandler } from '@nestjs/cqrs';
import { LogoutCommand } from '../commands/logout.command';
import { ITokenRepository } from '@app/application/todo/repositories/tokenRepository.interface';

@CommandHandler(LogoutCommand)
export class LogoutHandler {
  constructor(private readonly tokenRepository: ITokenRepository) {}

  async execute(command: LogoutCommand) {
    const { logout } = command;

    await this.tokenRepository.delete(logout.refreshToken);

    return { message: 'Logout successfully' };
  }
}
