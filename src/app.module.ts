import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MentorProfileModule } from './mentor-profile/mentor-profile.module';
import { SessionModule } from './session/session.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, MentorProfileModule, SessionModule, ReviewModule, AuthModule],
})
export class AppModule {}
