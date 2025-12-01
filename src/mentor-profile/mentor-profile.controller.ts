import {
  Controller,
  Post,
  Body,
  Patch,
  Get,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { MentorProfileService } from './mentor-profile.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import { GetUser } from 'src/auth/guards/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('mentors')
export class MentorProfileController {
  constructor(private readonly mentorService: MentorProfileService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MENTOR')
  @Post('profile')
  createProfile(@GetUser() user: User, @Body() dto: CreateMentorProfileDto) {
    return this.mentorService.createProfile(user.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MENTOR')
  @Patch('profile')
  updateProfile(@GetUser() user: User, @Body() dto: UpdateMentorProfileDto) {
    return this.mentorService.updateProfile(user.id, dto);
  }

  @Get()
  getAllMentors(@Query() query: any) {
    return this.mentorService.getMentors(query);
  }

  @Get(':id')
  getMentor(@Param('id') id: number) {
    return this.mentorService.getMentorById(id);
  }
}
