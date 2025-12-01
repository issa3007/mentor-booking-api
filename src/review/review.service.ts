import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { SessionsRepository } from 'src/session/session.repository';
import { UsersRepository } from 'src/user/user.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepo: ReviewRepository,
    private readonly sessionRepo: SessionsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async createReview(studentId: number, data: CreateReviewDto) {
    const student = await this.usersRepo.findById(studentId);
    if (!student || student.role !== 'STUDENT') {
      throw new ForbiddenException('Only students can write reviews');
    }

    const session = await this.sessionRepo.findById(data.sessionId);
    if (!session) throw new NotFoundException('Session not found');

    if (session.student.id !== studentId) {
      throw new ForbiddenException('You cannot review this session');
    }

    const existing = await this.reviewRepo.findBySession(data.sessionId);
    if (existing) {
      throw new ConflictException('Review already exists for this session');
    }

    if (session.status !== 'DONE') {
      throw new BadRequestException('Session must be DONE before review');
    }

    return this.reviewRepo.createReview({
      rating: data.rating,
      text: data.text,
      student: { id: studentId } as any,
      session: { id: data.sessionId } as any,
    });
  }

  async getReviewsForMentor(mentorId: number) {
    return this.reviewRepo.getMentorReview(mentorId);
  }

  async getOne(id: number, userId: number) {
    const review = await this.reviewRepo.findById(id);
    if (!review) throw new NotFoundException('Review not found');

    if (review.student.id !== userId && review.session.mentor.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return review;
  }
}
