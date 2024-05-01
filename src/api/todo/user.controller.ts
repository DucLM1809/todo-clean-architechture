import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheKey } from '@nestjs/cache-manager';
import { HttpCacheInterceptor } from '@app/infrastructure/persistence/cache/interceptor/http-cache.interceptor';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from '../dto/create-user-dto';
import { CreateUserCommand } from '@app/application/todo/use-cases/users/commands/create-user.command';
import {
  UsersQueryValidator,
  GetUsersQuery,
} from '@app/application/todo/use-cases/users/models/get-users.model';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UsePipes()
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Get()
  @CacheKey('users')
  @UseInterceptors(HttpCacheInterceptor)
  getAll(@Query() usersQuery: UsersQueryValidator) {
    return this.queryBus.execute(new GetUsersQuery(usersQuery));
  }
}
