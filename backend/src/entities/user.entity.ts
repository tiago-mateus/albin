import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Album } from './album.entity';
import { AuditLog } from './audit-log.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 'free' })
  plan: 'free' | 'pro' | 'premium';

  @Column({ type: 'int', default: 0 })
  storage_used_mb: number;

  @Column({ type: 'int', default: 0 })
  album_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Album, (album) => album.user)
  albums: Album[];

  @OneToMany(() => AuditLog, (log) => log.user)
  logs: AuditLog[];
}
