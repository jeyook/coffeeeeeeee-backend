import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Base } from './base.entity';
import { Provider } from './provider.entity';
import { UserRole } from './user-role.entity';

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

  @OneToOne(() => Provider)
  @JoinColumn({ name: 'provider_id' })
  provider: Provider;

  @OneToOne(() => UserRole)
  @JoinColumn({ name: 'user_role_id' })
  userRole: UserRole;
}
