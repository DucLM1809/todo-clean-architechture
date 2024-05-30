import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../models/get-user.model';
import { IUserRepository } from '@app/application/todo/repositories/userRepository.interface';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(query: GetUserQuery) {
    const { id } = query;
    return this.userRepository.findUnique(id);
  }
}
