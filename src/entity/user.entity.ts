import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';

// TODO: 프로바이더 값이 소문자였는지 기억이 안남.
export enum Provider {
  NAVER = 'naver',
  KAKAO = 'kakao',
  GOOGLE = 'google',
}

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 8 })
  nickname: string;

  @Column({ length: 30 })
  email: string;

  @Column({
    name: 'social_id',
    length: 50,
  })
  socialId: string;

  @Column({
    type: 'enum',
    enum: Provider,
  })
  provider: Provider;
}
