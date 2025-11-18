import { Body, Controller, Param, Post } from '@nestjs/common';
import { PhotosService } from './photos.service';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post(':albumId/presign')
  presign(@Param('albumId') albumId: string, @Body() body: { fileName: string }) {
    return this.photosService.createPresignedUpload(albumId, body.fileName);
  }

  @Post(':albumId')
  addPhoto(@Param('albumId') albumId: string, @Body() body: { url_original: string; size_kb: number }) {
    return this.photosService.savePhoto(albumId, body);
  }
}
