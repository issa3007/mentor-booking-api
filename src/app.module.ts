import { Module } from '@nestjs/common';
import { UsersModule } from './user/user.module';
import { MentorProfileModule } from './mentor-profile/mentor-profile.module';
import { SessionModule } from './session/session.module';
import { ReviewModule } from './review/review.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    MentorProfileModule,
    SessionModule,
    ReviewModule,
    AuthModule,
  ],
})
export class AppModule {}
