import { CreateUserDto } from '@app/api/dto/user/create-user.dto';

export class CreateUserCommand {
  constructor(public readonly createUser: CreateUserDto) {}
}
