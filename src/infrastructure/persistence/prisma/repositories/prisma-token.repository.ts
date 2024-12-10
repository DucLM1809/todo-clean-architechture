import { ITokenRepository } from '@app/application/todo/repositories/tokenRepository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Token } from '@app/domain/todo/entities/token';
import { PrismaTokenMapper } from '../mapper/prisma-token.mapper';

@Injectable()
export class PrismaTokenRepository implements ITokenRepository {
  constructor(private prisma: PrismaService) {}

  async save(token: Token): Promise<Token> {
    const data = PrismaTokenMapper.toPrisma(token);
    const entity = await this.prisma.token.create({ data });

    return PrismaTokenMapper.toDomain(entity);
  }

  async update(token: Token): Promise<Token> {
    const data = PrismaTokenMapper.toPrisma(token);
    const entity = await this.prisma.token.update({
      where: { id: token.id },
      data,
    });

    return PrismaTokenMapper.toDomain(entity);
  }

  async findFirstByUserId(userId: string): Promise<Token | null> {
    const entity = await this.prisma.token.findFirst({
      where: { userId },
    });

    return entity ? PrismaTokenMapper.toDomain(entity) : null;
  }

  async delete(refreshToken: string): Promise<void> {
    await this.prisma.token.delete({
      where: {
        value: refreshToken,
      },
    });
  }
}
