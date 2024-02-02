import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Cafe } from './cafe.entity';
import { Tag } from './tag.entity';

@Entity()
export class CafeTag {
  @PrimaryColumn({ type: 'integer', name: 'tag_id' })
  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @PrimaryColumn({ type: 'integer', name: 'cafe_id' })
  @ManyToOne(() => Cafe)
  @JoinColumn({ name: 'cafe_id' })
  cafe: Cafe;
}
