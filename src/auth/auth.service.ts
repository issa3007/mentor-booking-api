import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { UsersRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const exists = await this.usersRepo.findByEmail(data.email);
    if (exists) throw new ConflictException('Email already registered');

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.usersRepo.createUser({
      email: data.email,
      password: hashed,
      role: data.role,
      fullName: '',
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async login(data: LoginDto) {
    const user = await this.usersRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({
      id: user.id,
      role: user.role,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
