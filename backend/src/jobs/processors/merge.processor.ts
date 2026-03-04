import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../../common/prisma/prisma.service';
import { StorageService } from '../../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Processor('pdf-jobs')
export class MergeProcessor extends WorkerHost {
    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        const { jobId, files, options } = job.data;

        // Switch behavior based on tool type name handling
        if (job.name !== 'MERGE' && job.name !== 'SPLIT' && job.name !== 'COMPRESS') {
            console.log(`Job skipped by MergeProcessor (unsupported type: ${job.name})`);
            return; // Handle with specific processor or universal processor later.
        }

        try {
            await this.prisma.job.update({
                where: { id: jobId },
                data: { status: 'PROCESSING', progress: 10, startedAt: new Date() },
            });

            // SIMULATING LONG RUNNING JOB (qpdf / ghostscript)
            console.log(`[Worker] Started processing job ${jobId} of type ${job.name}`);

            // Simulate downloading input files from S3
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await job.updateProgress(40);
            await this.prisma.job.update({ where: { id: jobId }, data: { progress: 40 } });

            // Simulate PDF operations
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await job.updateProgress(80);
            await this.prisma.job.update({ where: { id: jobId }, data: { progress: 80 } });

            // SIMULATE UPLOAD RESULT TO S3
            const outputStorageKey = `processed/${uuidv4()}.pdf`;
            const outputBucket = process.env.S3_BUCKET_OUTPUT || 'pdfforge-output';

            // We would normally upload a real file here:
            // await this.storage.upload(resultBuffer, outputStorageKey, 'application/pdf', outputBucket);

            // Create output file record in database
            const outputFile = await this.prisma.file.create({
                data: {
                    originalName: `result_${job.name.toLowerCase()}.pdf`,
                    storedName: outputStorageKey,
                    mimeType: 'application/pdf',
                    size: 1024 * 1024 * 2, // simulated 2MB
                    storageKey: outputStorageKey,
                    bucket: outputBucket,
                    status: 'UPLOADED',
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour TTL
                },
            });

            // Link output file to job
            await this.prisma.jobFile.create({
                data: {
                    jobId: jobId,
                    fileId: outputFile.id,
                    role: 'OUTPUT',
                    sortOrder: 0,
                },
            });

            await this.prisma.job.update({
                where: { id: jobId },
                data: { status: 'COMPLETED', progress: 100, completedAt: new Date() },
            });

            console.log(`[Worker] Completed job ${jobId}`);
            return { success: true };

        } catch (error: any) {
            console.error(`[Worker] Failed job ${jobId}:`, error);

            await this.prisma.job.update({
                where: { id: jobId },
                data: {
                    status: 'FAILED',
                    errorCode: 'PROCESS_ERROR',
                    errorMessage: error.message || 'Unknown processing error',
                    completedAt: new Date()
                },
            });

            throw error;
        }
    }
}
