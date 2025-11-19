import { BaseEntity } from 'src/common/base-entity';
import { SessionStatus } from 'src/common/enums/session-status.enum';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Review } from 'src/review/entities/review.entity';

@Entity('sessions')
export class Session extends BaseEntity {
  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.PENDING,
  })
  status: SessionStatus;

  @Column()
  topic: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => User, (user) => user.mentorSessions)
  mentor: User;

  @ManyToOne(() => User, (user) => user.studentSessions)
  student: User;

  @OneToMany(() => Review, (review) => review.session)
  reviews: Review[];
}
