import { Module } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UsersController } from 'src/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UsersRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports:[UsersRepository]
})
export class UsersModule {}
