import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Provider } from './provider.entity';
import { UserRole } from './user-role.entity';

@Entity()
export class User extends Base {
  @PrimaryGeneratedColumn()
  id: number;

  // TODO: 적절한 이름 길이 정하기
  @Column({ length: 50 })
  nickname: string;

  // TODO: 적절한 이메일 길이 정하기
  @Column({ length: 200 })
  email: string;

  @Column({
    name: 'social_id',
    length: 50,
  })
  socialId: string;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @ManyToOne(() => UserRole)
  @JoinColumn({ name: 'user_role_id' })
  userRole: UserRole;
}
