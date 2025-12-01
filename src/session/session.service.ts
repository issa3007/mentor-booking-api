import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { SessionsRepository } from 'src/session/session.repository';
import { UsersRepository } from 'src/user/user.repository';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionStatus } from 'src/common/enums/session-status.enum';

@Injectable()
export class SessionsService {
  constructor(
    private readonly sessionsRepo: SessionsRepository,
    private readonly usersRepo: UsersRepository,
  ) {}

  async createSession(studentId: number, data: CreateSessionDto) {
    const student = await this.usersRepo.findById(studentId);
    if (!student) throw new NotFoundException('Student not found');

    if (student.role !== 'STUDENT') {
      throw new ForbiddenException('Only students can book sessions');
    }

    const mentor = await this.usersRepo.findById(data.mentorId);
    if (!mentor) throw new NotFoundException('Mentor not found');

    if (mentor.role !== 'MENTOR') {
      throw new ForbiddenException('Invalid mentor role');
    }

    if (data.startTime >= data.endTime) {
      throw new BadRequestException('Invalid time range');
    }

    const busy = await this.sessionsRepo.isMentorBusy(
      data.mentorId,
      new Date(data.startTime),
      new Date(data.endTime),
    );

    if (busy) throw new ConflictException('Mentor is busy at this time');

    return this.sessionsRepo.createSession({
      student: { id: studentId } as any,
      mentor: { id: data.mentorId } as any,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      topic: data.topic,
      status: SessionStatus.PENDING,
    });
  }

  async getMySessions(userId: number, role: string, filters: any) {
    if (role === 'STUDENT') {
      return this.sessionsRepo.findUserSession(userId, filters);
    }

    if (role === 'MENTOR') {
      return this.sessionsRepo.findMentorSession(userId, filters);
    }

    throw new ForbiddenException('Invalid role');
  }

  async getOne(sessionId: number, userId: number) {
    const session = await this.sessionsRepo.findById(sessionId);
    if (!session) throw new NotFoundException('Session not found');

    if (session.student.id !== userId && session.mentor.id !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return session;
  }
}
