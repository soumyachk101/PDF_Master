import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MergeProcessor } from './processors/merge.processor';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'pdf-jobs',
        }),
        StorageModule,
    ],
    controllers: [JobsController],
    providers: [JobsService, MergeProcessor],
    exports: [JobsService],
})
export class JobsModule { }
