import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { MentorProfileRepository } from './mentor-profile.repository';
import { UsersRepository } from 'src/user/user.repository';
import { CreateMentorProfileDto } from './dto/create-mentor-profile.dto';
import { UpdateMentorProfileDto } from './dto/update-mentor-profile.dto';
import { UserRole } from 'src/common/enums/role-enums';

@Injectable()
export class MentorProfileService {
  constructor(
    private readonly mentorRepo: MentorProfileRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async createProfile(userId: number, dto: CreateMentorProfileDto) {
    const user = await this.usersRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (user.role !== UserRole.MENTOR) {
      throw new ForbiddenException('Only mentors can create a profile');
    }

    const existing = await this.mentorRepo.findByUserId(userId);
    if (existing) {
      throw new ConflictException('Profile already exists');
    }

    return this.mentorRepo.createProfile({
      ...dto,
      user: { id: userId } as any,
    });
  }

  async updateProfile(userId: number, dto: UpdateMentorProfileDto) {
    const profile = await this.mentorRepo.findByUserId(userId);
    if (!profile) throw new NotFoundException('Mentor profile not found');

    return this.mentorRepo.updateProfile(profile.id, dto);
  }

  async getMentors(query: any) {
    return this.mentorRepo.filterMentors(query);
  }

  async getMentorById(id: number) {
    const profile = await this.mentorRepo.findById(id);
    if (!profile) {
      throw new NotFoundException('Mentor not found');
    }

    return profile;
  }
}
