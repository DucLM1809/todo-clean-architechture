import { Token } from '@app/domain/todo/entities/token';
import { Prisma, Token as PrismaToken } from '@prisma/client';

export class PrismaTokenMapper {
  static toDomain(entity: PrismaToken) {
    const model = new Token({
      id: entity.id,
      value: entity.value,
      userId: entity.userId,
    });
    return model;
  }

  static toPrisma(token: Token): Prisma.TokenUncheckedCreateInput {
    const model = {
      id: token.id,
      value: token.value,
      userId: token.userId,
    };
    return model;
  }
}
