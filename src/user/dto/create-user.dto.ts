import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/common/enums/role-enums';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  fullName: string;
}
