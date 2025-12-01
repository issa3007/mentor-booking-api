import { Module } from '@nestjs/common';
import { SessionsService } from 'src/session/session.service';
import { SessionsController } from 'src/session/session.controller';
import { SessionsRepository } from 'src/session/session.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from 'src/session/entities/session.entity';
import { UsersModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, User]), UsersModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepository],
  exports: [SessionsRepository],
})
export class SessionModule {}
