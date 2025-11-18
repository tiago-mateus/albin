import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body() body: { userId: string; title: string; description?: string; expiresAt?: string }) {
    return this.albumsService.createAlbum(body.userId, {
      title: body.title,
      description: body.description,
      expiresAt: body.expiresAt ? new Date(body.expiresAt) : undefined,
    });
  }

  @Get(':id')
  get(@Param('id') id: string, @Query('userId') userId: string) {
    return this.albumsService.getAlbum(id, userId);
  }

  @Get('public/:url')
  public(@Param('url') url: string) {
    return this.albumsService.publicAlbum(url);
  }
}
