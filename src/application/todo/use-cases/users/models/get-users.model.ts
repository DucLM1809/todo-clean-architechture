import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UsersQueryValidator {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  perPage?: number;
}

export class GetUsersQuery {
  constructor(public readonly usersQuery: UsersQueryValidator) {}
}
