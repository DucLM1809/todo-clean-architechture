import { Prisma } from '@prisma/client';

export interface IUserPaginationRequest {
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
  page?: number;
  perPage?: number;
}
