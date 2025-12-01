import { Module } from '@nestjs/common';
import { MentorProfileService } from './mentor-profile.service';
import { MentorProfileController } from './mentor-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorProfile } from 'src/mentor-profile/entities/mentor-profile.entity';
import { MentorProfileRepository } from 'src/mentor-profile/mentor-profile.repository';
import { UsersModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MentorProfile]), UsersModule],
  controllers: [MentorProfileController],
  providers: [MentorProfileService, MentorProfileRepository],
})
export class MentorProfileModule {}
