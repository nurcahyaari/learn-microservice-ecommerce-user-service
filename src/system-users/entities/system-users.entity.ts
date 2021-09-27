import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// system_users store an administrator for this things
@Entity({ name: 'system_users' })
export class SystemUsers {
  @PrimaryGeneratedColumn({ name: 'system_user_id' })
  system_user_id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'password' })
  password: string;
}
