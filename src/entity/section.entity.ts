import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Cafe } from './cafe.entity';

@Entity()
export class Section extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon' })
  geom: object;

  @OneToMany(() => Cafe, (cafe) => cafe.cafeSection, { cascade: true, eager: true })
  cafe: Cafe[];
}
