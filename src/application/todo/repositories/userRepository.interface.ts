import { PaginatedResult } from '@app/core/models/pagination.model';
import { User } from '@app/domain/todo/entities/user';
import { UsersQueryValidator } from '../use-cases/users/models/get-users.model';

export abstract class UserRepository {
  abstract findMany(
    usersQuery: UsersQueryValidator,
  ): Promise<PaginatedResult<User>>;
  abstract create(data: User): Promise<User>;
}
