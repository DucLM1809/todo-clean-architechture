import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
