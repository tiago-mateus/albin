import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { Photo } from '../../entities/photo.entity';
import { Album } from '../../entities/album.entity';
import { StorageModule } from '../storage/storage.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Album]), StorageModule, AlbumsModule],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
