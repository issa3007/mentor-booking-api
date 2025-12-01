import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from 'src/review/entities/review.entity';
import { UsersModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Session } from 'src/session/entities/session.entity';
import { SessionModule } from 'src/session/session.module';
import { ReviewRepository } from 'src/review/review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Session]), UsersModule, SessionModule],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
