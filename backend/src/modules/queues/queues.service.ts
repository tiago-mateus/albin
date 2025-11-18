import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueuesService {
  constructor(
    @InjectQueue('thumbnail') private readonly thumbnailQueue: Queue,
    @InjectQueue('zip') private readonly zipQueue: Queue,
    @InjectQueue('cleanup') private readonly cleanupQueue: Queue,
  ) {}

  enqueueThumbnail(photoId: string, url: string) {
    return this.thumbnailQueue.add('generate', { photoId, url });
  }

  enqueueZip(albumId: string) {
    return this.zipQueue.add('generate', { albumId });
  }

  enqueueCleanup(albumId: string) {
    return this.cleanupQueue.add('expire', { albumId });
  }
}
