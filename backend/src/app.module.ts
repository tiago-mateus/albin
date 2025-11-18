import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { PhotosModule } from './modules/photos/photos.module';
import { BillingModule } from './modules/billing/billing.module';
import { StorageModule } from './modules/storage/storage.module';
import { QueuesModule } from './modules/queues/queues.module';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: () => typeOrmConfig }),
    UsersModule,
    AlbumsModule,
    PhotosModule,
    BillingModule,
    StorageModule,
    QueuesModule,
    AuthModule,
  ],
})
export class AppModule {}
