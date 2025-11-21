import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async create(data: CreateUserDto) {
    const emailTaken = await this.userRepo.isEmailTaken(data.email);
    if (emailTaken) {
      throw new ConflictException('Email already in use');
    }
    data.password = await bcrypt.hash(data.password, 10);

    return this.userRepo.createUser(data);
  }

  async findAll() {
    return this.userRepo.findAll();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    if (data.role && data.role !== user.role) {
      throw new ForbiddenException('Role cannot be changed');
    }

    if (data.email && data.email !== user.email) {
      const emailTaken = await this.userRepo.isEmailTaken(data.email);
      if (emailTaken) throw new ConflictException('Email already in use');
    }

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.userRepo.updateUser(id, data);
  }

  async remove(id: number) {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.delete(id);
    return { message: 'User deleted' };
  }
}
