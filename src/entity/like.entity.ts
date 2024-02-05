import { Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { Cafe } from './cafe.entity';
import { User } from './user.entity';

@Entity()
@Unique(['cafe', 'user']) //database에서 중복 원천 차단.
export class Like {
  @PrimaryColumn({ type: 'integer', name: 'cafe_id' })
  @ManyToOne(() => Cafe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cafe_id' })
  cafe: Cafe;

  @PrimaryColumn({ type: 'integer', name: 'user_id' })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
