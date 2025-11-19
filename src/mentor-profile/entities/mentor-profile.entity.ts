import { BaseEntity } from 'src/common/base-entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('mentor-profiles')
export class MentorProfile extends BaseEntity {
  @Column()
  fullName: string;

  @Column({ type: 'text' })
  bio: string;

  @Column()
  expertise: string;

  @Column()
  hourlyRate: number;

  @Column()
  isActive: boolean;

  @OneToOne(() => User, (user) => user.mentorProfile)
  @JoinColumn()
  user: User;
}
