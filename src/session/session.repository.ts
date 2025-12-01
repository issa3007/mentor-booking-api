import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';

@Injectable()
export class SessionsRepository {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
  ) {}

  async createSession(data: Partial<Session>) {
    const session = this.sessionRepo.create(data);
    return this.sessionRepo.save(session);
  }

  async findById(id: number) {
    return this.sessionRepo
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.student', 'student')
      .leftJoinAndSelect('session.mentor', 'mentor')
      .where('session.id = :id', { id })
      .getOne();
  }

  async findUserSession(userId: number, filters: any) {
    const { status, from, to } = filters;

    const qb = this.sessionRepo
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.mentor', 'mentor')
      .leftJoinAndSelect('session.student', 'student')
      .where('session.studentId = :userId', { userId });

    if (status) qb.andWhere('session.status = :status', { status });
    if (from) qb.andWhere('session.startTime >= :from', { from });
    if (to) qb.andWhere('session.endTime <= :to', { to });

    return qb.orderBy('session.startTime', 'ASC').getMany();
  }

  async findMentorSession(mentorId: number, filters: any) {
    const { status, from, to } = filters;

    const qb = this.sessionRepo
      .createQueryBuilder('session')
      .leftJoinAndSelect('session.student', 'student')
      .leftJoinAndSelect('session.mentor', 'mentor')
      .where('session.mentorId = :mentorId', { mentorId });

    if (status) qb.andWhere('session.status = :status', { status });
    if (from) qb.andWhere('session.startTime >= :from', { from });
    if (to) qb.andWhere('session.endTime <= :to', { to });

    return qb.orderBy('session.startTime', 'ASC').getMany();
  }

  async isMentorBusy(mentorId: number, startTime: Date, endTime: Date) {
    return this.sessionRepo
      .createQueryBuilder('session')
      .where('session.mentorId = :mentorId', { mentorId })
      .andWhere(
        'session.startTime < :endTime AND session.endTime > :startTime',
        { startTime, endTime },
      )
      .andWhere('session.status IN (:...statuses)', {
        statuses: ['PENDING', 'CONFIRMED'],
      })
      .getOne();
  }

  async updateSession(id: number, data: Partial<Session>) {
    await this.sessionRepo.update({ id }, data);
    return this.findById(id);
  }
}
