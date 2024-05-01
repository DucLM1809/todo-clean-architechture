import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UsersQueryValidator {
  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional()
  @IsInt()
  @Type(() => Number)
  perPage?: number;
}

export class GetUsersQuery {
  constructor(public readonly usersQuery: UsersQueryValidator) {}
}
