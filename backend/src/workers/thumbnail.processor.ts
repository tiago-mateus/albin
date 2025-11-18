import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('thumbnail')
export class ThumbnailProcessor extends WorkerHost {
  async process(job: Job<{ photoId: string; url: string }>) {
    // Placeholder for thumbnail creation logic
    console.log(`Generating thumbnail for photo ${job.data.photoId} from ${job.data.url}`);
    return true;
  }
}
