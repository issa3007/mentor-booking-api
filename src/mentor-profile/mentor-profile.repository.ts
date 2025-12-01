import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MentorProfile } from './entities/mentor-profile.entity';

@Injectable()
export class MentorProfileRepository {
  constructor(
    @InjectRepository(MentorProfile)
    private readonly mentorProfileRepo: Repository<MentorProfile>,
  ) {}

  async findByUserId(userId: number) {
    return this.mentorProfileRepo
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.userId = :userId', { userId })
      .getOne();
  }

  async findById(id: number) {
    return this.mentorProfileRepo
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.id = :id', { id })
      .getOne();
  }

  async createProfile(data: Partial<MentorProfile>) {
    const profile = this.mentorProfileRepo.create(data);
    return this.mentorProfileRepo.save(profile);
  }

  async updateProfile(id: number, data: Partial<MentorProfile>) {
    await this.mentorProfileRepo.update({ id }, data);
    return this.findById(id);
  }

  async filterMentors(query: {
    search?: string;
    minRate?: number;
    maxRate?: number;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const {
      search,
      minRate,
      maxRate,
      isActive = true,
      page = 1,
      limit = 10,
    } = query;

    const qb = this.mentorProfileRepo
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where('profile.isActive = :isActive', { isActive });

    if (search) {
      qb.andWhere(
        '(profile.fullName LIKE :search OR profile.expertise LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (minRate) {
      qb.andWhere('profile.hourlyRate >= :minRate', { minRate });
    }

    if (maxRate) {
      qb.andWhere('profile.hourlyRate <= :maxRate', { maxRate });
    }

    const total = await qb.getCount();

    const data = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('profile.id', 'DESC')
      .getMany();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
