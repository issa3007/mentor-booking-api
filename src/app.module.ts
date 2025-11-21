import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { MentorProfileModule } from './mentor-profile/mentor-profile.module';
import { SessionModule } from './session/session.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    MentorProfileModule,
    SessionModule,
    ReviewModule,
    AuthModule,
  ],
})
export class AppModule {}
