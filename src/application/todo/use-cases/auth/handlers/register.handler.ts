import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommand } from '../commands/register.command';
import { User } from '@app/domain/todo/entities/user';
import { IBcryptService } from '@app/application/common/adapters/bcrypt.interface';
import exclude from '@app/core/utils/exclude';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { ExceptionsService } from '@app/application/common/exceptions/exceptions.service';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: IBcryptService,
    private readonly publisher: EventPublisher,
    private readonly exception: ExceptionsService,
  ) {}

  async execute(command: RegisterCommand) {
    const { register } = command;

    const user = new User({ ...register });

    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      this.exception.badRequestException({
        message: 'User already exists',
      });
    }

    const hashedPassword = await this.bcryptService.hash(user.password);

    const userWithHashedPassword = new User({
      ...register,
      password: hashedPassword,
    });

    const userCreated = this.publisher.mergeObjectContext(
      await this.userRepository.create(userWithHashedPassword),
    );

    userCreated.commit();

    return exclude(register, ['password']);
  }
}
