import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MentorProfileService } from './mentor-profile.service';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';

@Controller('mentor-profile')
export class MentorProfileController {
  constructor(private readonly mentorProfileService: MentorProfileService) {}

  @Post()
  create(@Body() createMentorProfileDto: CreateMentorProfileDto) {
    return this.mentorProfileService.create(createMentorProfileDto);
  }

  @Get()
  findAll() {
    return this.mentorProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentorProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMentorProfileDto: UpdateMentorProfileDto) {
    return this.mentorProfileService.update(+id, updateMentorProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mentorProfileService.remove(+id);
  }
}
