import { BaseEntity } from 'src/common/base-entity';
import { UserRole } from 'src/common/enums/role-enums';
import { MentorProfile } from 'src/mentor-profile/entities/mentor-profile.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Session } from 'src/session/entities/session.entity';
import { Review } from 'src/review/entities/review.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @OneToOne(() => MentorProfile, (profile) => profile.user)
  mentorProfile: MentorProfile;

  @OneToMany(() => Session, (session) => session.mentor)
  mentorSessions: Session[];

  @OneToMany(() => Session, (session) => session.student)
  studentSessions: Session[];

  @OneToMany(() => Review, (review) => review.student)
  reviews: Review[];
}
