import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/auth/login.dto';
import { LoginCommand } from '@app/application/todo/use-cases/auth/commands/login.command';
import { RegisterCommand } from '@app/application/todo/use-cases/auth/commands/register.command';
import { RegisterDto } from '../dto/auth/register.dto';
import { RefreshTokenCommand } from '@app/application/todo/use-cases/auth/commands/refresh-token.command';
import { RefreshTokenDto } from '../dto/auth/refresh-token.dto';
import { LoginGuard } from '@app/application/common/guards/login.guard';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(LoginGuard)
  @Post('/login')
  @UsePipes()
  login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto));
  }

  @Post('/register')
  @UsePipes()
  register(@Body() registerDto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(registerDto));
  }

  @Post('/refresh-token')
  @UsePipes()
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.commandBus.execute(new RefreshTokenCommand(refreshTokenDto));
  }
}
