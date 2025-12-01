import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/common/enums/role-enums';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
