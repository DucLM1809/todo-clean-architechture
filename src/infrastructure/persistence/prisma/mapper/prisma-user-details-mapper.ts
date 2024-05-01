import { User } from '@app/domain/todo/entities/user';
import { User as PrismaUser } from '@prisma/client';

type UserDomain = PrismaUser;

export class PrismaUserDetailsMapper {
  static toDomain(entity: UserDomain): User {
    const model = new User({
      id: entity.id,
      name: entity.name,
    });
    return model;
  }
}
