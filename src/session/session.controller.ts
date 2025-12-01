import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SessionsService } from 'src/session/session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('sessions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Roles('STUDENT')
  @Post()
  create(@GetUser() user: User, @Body() data: CreateSessionDto) {
    return this.sessionsService.createSession(user.id, data);
  }

  @Get('my')
  getMySessions(@GetUser() user: User, @Query() query: any) {
    return this.sessionsService.getMySessions(user.id, user.role, query);
  }

  @Get(':id')
  getOne(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
    return this.sessionsService.getOne(id, user.id);
  }
}
