import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class FollowingTag {
  @PrimaryColumn({ type: 'integer', name: 'tag_id' })
  @ManyToOne(() => Tag)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @PrimaryColumn({ type: 'integer', name: 'user_id' })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
