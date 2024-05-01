import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { UserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { User } from '@app/domain/todo/entities/user';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand) {
    const { createUser } = command;

    const user = new User({ ...createUser });

    const userCreated = this.publisher.mergeObjectContext(
      await this.userRepository.create(user),
    );

    userCreated.commit();

    return user;
  }
}
