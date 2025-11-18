import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Album } from '../entities/album.entity';
import { Photo } from '../entities/photo.entity';
import { AuditLog } from '../entities/audit-log.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL || 'postgres://albin:albin@localhost:5432/albin',
  entities: [User, Album, Photo, AuditLog],
  synchronize: false,
  migrationsRun: false,
};
