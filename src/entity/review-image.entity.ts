import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Review } from './review.entity';

@Entity()
export class ReviewImage extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 300 })
  url: string;

  @ManyToOne(() => Review)
  @JoinColumn({ name: 'review_id' })
  review: Review;
}
