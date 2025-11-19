import { Module } from '@nestjs/common';
import { MentorProfileService } from './mentor-profile.service';
import { MentorProfileController } from './mentor-profile.controller';

@Module({
  controllers: [MentorProfileController],
  providers: [MentorProfileService],
})
export class MentorProfileModule {}
