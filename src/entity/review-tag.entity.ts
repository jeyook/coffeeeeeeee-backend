import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Review } from './review.entity';
import { Tag } from './tag.entity';

@Entity()
export class ReviewTag {
  @PrimaryColumn({ type: 'integer', name: 'tag_id' })
  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @PrimaryColumn({ type: 'integer', name: 'review_id' })
  @ManyToOne(() => Review, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
