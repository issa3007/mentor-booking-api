import { BaseEntity } from 'src/common/base-entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Session } from 'src/session/entities/session.entity';

@Entity('reviews')
export class Review extends BaseEntity {
  @Column()
  rating: number;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => User, (user) => user.reviews)
  student: User;

  @ManyToOne(() => Session, (session) => session.reviews)
  session: Session;
}
