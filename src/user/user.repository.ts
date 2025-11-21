import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(createUserDto);
    return this.usersRepo.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepo.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { email },
      select: ['id', 'email', 'role'],
    });
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const count = await this.usersRepo.count({ where: { email } });
    return count > 0;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) return null;
    this.usersRepo.merge(user, dto);
    return this.usersRepo.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }
}
