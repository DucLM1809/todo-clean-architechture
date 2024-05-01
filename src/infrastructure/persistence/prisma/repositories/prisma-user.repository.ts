import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserRepository } from '@app/application/todo/repositories/userRepository.interface';
import { User } from '@app/domain/todo/entities/user';
import { PrismaUserMapper } from '../mapper/prisma-user.mapper';
import {
  PaginateFunction,
  PaginatedResult,
} from '@app/core/models/pagination.model';
import { IUserPaginationRequest } from '../models/prisma-users-pagination.interface';
import { paginator } from '@app/infrastructure/services/pagination/paginator';

const paginate: PaginateFunction = paginator({});

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany({
    where,
    orderBy,
    page,
    perPage,
  }: IUserPaginationRequest): Promise<PaginatedResult<User>> {
    return paginate(this.prisma.user, { where, orderBy }, { page, perPage });
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);
    const entity = await this.prisma.user.create({ data });

    return PrismaUserMapper.toDomain(entity);
  }
}
