import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../../entities/album.entity';
import { Photo } from '../../entities/photo.entity';
import { UsersService } from '../users/users.service';
import { v4 as uuid } from 'uuid';

const PLAN_LIMITS = {
  free: { maxAlbums: 1, maxStorageMb: 100 },
  pro: { maxAlbums: 20, maxStorageMb: 10240 },
  premium: { maxAlbums: 100, maxStorageMb: 51200 },
};

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private albumRepo: Repository<Album>,
    @InjectRepository(Photo) private photoRepo: Repository<Photo>,
    private readonly usersService: UsersService,
  ) {}

  async createAlbum(userId: string, payload: { title: string; description?: string; expiresAt?: Date }) {
    const user = await this.usersService.findById(userId);
    const limits = PLAN_LIMITS[user.plan];
    if (user.album_count >= limits.maxAlbums) {
      throw new BadRequestException('Album limit reached. Please upgrade your plan.');
    }
    const album = this.albumRepo.create({
      user_id: userId,
      title: payload.title,
      description: payload.description,
      expires_at: payload.expiresAt || null,
      public_url: uuid(),
      status: 'active',
    });
    await this.albumRepo.save(album);
    user.album_count += 1;
    await this.usersService.ensureUser(user.email, user.name);
    return album;
  }

  async getAlbum(id: string, userId: string) {
    const album = await this.albumRepo.findOne({ where: { id, user_id: userId } });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async publicAlbum(publicUrl: string) {
    const album = await this.albumRepo.findOne({ where: { public_url: publicUrl } });
    if (!album || album.status === 'expired') {
      throw new NotFoundException('Link expired');
    }
    return album;
  }

  async addPhoto(albumId: string, data: Partial<Photo>) {
    const album = await this.albumRepo.findOne({ where: { id: albumId } });
    if (!album) throw new NotFoundException('Album not found');
    const photo = this.photoRepo.create({ ...data, album_id: albumId });
    await this.photoRepo.save(photo);
    return photo;
  }
}
