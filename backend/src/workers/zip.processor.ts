import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('zip')
export class ZipProcessor extends WorkerHost {
  async process(job: Job<{ albumId: string }>) {
    // Placeholder for zip generation logic
    console.log(`Generating zip for album ${job.data.albumId}`);
    return true;
  }
}
