import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUsersQuery } from '../models/get-users.model';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(query: GetUsersQuery) {
    return this.userRepository.findMany(query.usersQuery);
  }
}
