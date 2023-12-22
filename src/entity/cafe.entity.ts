import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { CafeTag } from './cafe-tag.entity';

@Entity()
export class Cafe extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'place_id',
  })
  placeId: number;

  @Column({ length: 40 })
  address: string;

  @Column({ length: 20 })
  name: string;

  @Column({ name: 'map_x' })
  mapX: number;

  @Column({ name: 'map_y' })
  mapY: number;

  @Column({
    name: 'phone_number',
    length: 13,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'image_url',
    length: 300,
  })
  imageUrl: string;

  @Column({
    name: 'homepage_url',
    length: 30,
    nullable: true,
  })
  homepageUrl: string;

  // TODO: lazy 로딩 나중에 고민하고 넣기
  @OneToMany(() => CafeTag, (cafeTag) => cafeTag.cafe, { cascade: true })
  cafeTags: CafeTag[];
}
