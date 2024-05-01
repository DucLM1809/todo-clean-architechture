import { UserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../models/get-users.model';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUsersQuery) {
    return this.userRepository.findMany(query.usersQuery);
  }
}
