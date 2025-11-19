import { Injectable } from '@nestjs/common';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';

@Injectable()
export class MentorProfileService {
  create(createMentorProfileDto: CreateMentorProfileDto) {
    return 'This action adds a new mentorProfile';
  }

  findAll() {
    return `This action returns all mentorProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mentorProfile`;
  }

  update(id: number, updateMentorProfileDto: UpdateMentorProfileDto) {
    return `This action updates a #${id} mentorProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} mentorProfile`;
  }
}
