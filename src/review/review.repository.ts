import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  async createReview(data: Partial<Review>) {
    const review = this.reviewRepo.create(data);
    return this.reviewRepo.save(review);
  }

  async findBySession(sessionId: number) {
    return this.reviewRepo.findOne({
      where: { session: { id: sessionId } },
    });
  }

  async findById(id: number) {
    return this.reviewRepo
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.student', 'student')
      .leftJoinAndSelect('review.session', 'session')
      .where('review.id = :id', { id })
      .getOne();
  }

  async getMentorReview(mentorId: number) {
    return this.reviewRepo
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.student', 'student')
      .leftJoinAndSelect('review.session', 'session')
      .where('session.mentorId = :mentorId', { mentorId })
      .orderBy('review.id', 'DESC')
      .getMany();
  }
}
