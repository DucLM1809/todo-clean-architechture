import { User } from '@app/domain/todo/entities/user';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toDomain(entity: PrismaUser): User {
    const model = new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      role: entity.role,
      password: entity.password,
    });
    return model;
  }

  static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
