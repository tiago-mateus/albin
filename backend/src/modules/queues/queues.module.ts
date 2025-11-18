import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueuesService } from './queues.service';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      },
    }),
    BullModule.registerQueue({ name: 'thumbnail' }),
    BullModule.registerQueue({ name: 'zip' }),
    BullModule.registerQueue({ name: 'cleanup' }),
  ],
  providers: [QueuesService],
  exports: [QueuesService],
})
export class QueuesModule {}
