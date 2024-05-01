import { CreateUserDto } from '@app/api/dto/create-user-dto';

export class CreateUserCommand {
  constructor(public readonly createUser: CreateUserDto) {}
}
