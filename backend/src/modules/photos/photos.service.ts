import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../../entities/photo.entity';
import { StorageService } from '../storage/storage.service';
import { AlbumsService } from '../albums/albums.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    private readonly storageService: StorageService,
    private readonly albumsService: AlbumsService,
  ) {}

  async createPresignedUpload(albumId: string, fileName: string) {
    const album = await this.albumsService.getAlbum(albumId, albumId ? undefined : undefined);
    const { uploadUrl, fileUrl } = await this.storageService.generatePresignedUrl(fileName);
    return { album, uploadUrl, fileUrl };
  }

  async savePhoto(albumId: string, payload: { url_original: string; size_kb: number }) {
    await this.albumsService.getAlbum(albumId, payload['userId'] as any);
    const photo = this.photoRepo.create({ ...payload, album_id: albumId });
    return this.photoRepo.save(photo);
  }
}
