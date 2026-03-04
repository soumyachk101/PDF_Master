import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class JobsService {
    constructor(
        @InjectQueue('pdf-jobs') private readonly jobsQueue: Queue,
        private readonly prisma: PrismaService,
    ) { }

    async createJob(
        userId: string | undefined,
        toolType: any,
        fileIds: string[],
        options: any = {},
    ) {
        if (!fileIds || fileIds.length === 0) {
            throw new BadRequestException('At least one file is required');
        }

        // Verify files exist
        const files = await this.prisma.file.findMany({
            where: { id: { in: fileIds } },
        });

        if (files.length !== fileIds.length) {
            throw new BadRequestException('One or more files not found');
        }

        // Create job record in db
        const job = await this.prisma.job.create({
            data: {
                userId,
                toolType,
                status: 'QUEUED',
                priority: 3, // default
                options,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            },
        });

        // Create job-file relations
        await Promise.all(
            fileIds.map((fileId, index) =>
                this.prisma.jobFile.create({
                    data: {
                        jobId: job.id,
                        fileId,
                        role: 'INPUT',
                        sortOrder: index,
                    },
                }),
            ),
        );

        // Add to BullMQ
        await this.jobsQueue.add(
            toolType,
            {
                jobId: job.id,
                files: files.map(f => ({ id: f.id, storageKey: f.storageKey, originalName: f.originalName })),
                options,
            },
            { jobId: job.id },
        );

        return { jobId: job.id, status: job.status };
    }

    async getJobStatus(jobId: string, userId?: string) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: {
                jobFiles: {
                    include: { file: true },
                },
            },
        });

        if (!job) {
            throw new NotFoundException('Job not found');
        }

        if (userId && job.userId && job.userId !== userId) {
            throw new BadRequestException('Cannot access this job');
        }

        const inputFiles = job.jobFiles.filter(jf => jf.role === 'INPUT').map(jf => jf.file);
        const outputFiles = job.jobFiles.filter(jf => jf.role === 'OUTPUT').map(jf => jf.file);

        return {
            id: job.id,
            status: job.status,
            progress: job.progress,
            options: job.options,
            errorCode: job.errorCode,
            errorMessage: job.errorMessage,
            inputFiles: inputFiles.map(f => ({ id: f.id, name: f.originalName })),
            outputFiles: outputFiles.map(f => ({ id: f.id, name: f.originalName, size: f.size.toString() })),
        };
    }
}
