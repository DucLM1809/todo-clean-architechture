import { PaginatedResult } from '@app/core/models/pagination.model';
import { User } from '@app/domain/todo/entities/user';
import { UsersQueryValidator } from '../use-cases/users/models/get-users.model';

export abstract class IUserRepository {
  abstract findMany(
    usersQuery: UsersQueryValidator,
  ): Promise<PaginatedResult<User>>;
  abstract findUnique(id: string): Promise<User>;
  abstract findByEmail(email: string): Promise<User>;
  abstract create(data: User): Promise<User>;
}
