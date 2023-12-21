import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Cafe } from './cafe.entity';
import { ReviewImage } from './review-image.entity';
import { User } from './user.entity';

@Entity()
export class Review extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ length: 500 })
  content: string;

  @ManyToOne(() => Cafe, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cafe_id' })
  cafe: Cafe;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ReviewImage, (reviewImage) => reviewImage.review, { cascade: true, eager: true })
  reviewImages: ReviewImage[];
}
