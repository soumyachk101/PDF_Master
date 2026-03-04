import { Queue } from 'bullmq';
import { PrismaService } from '../common/prisma/prisma.service';
export declare class JobsService {
    private readonly jobsQueue;
    private readonly prisma;
    constructor(jobsQueue: Queue, prisma: PrismaService);
    createJob(userId: string | undefined, toolType: any, fileIds: string[], options?: any): Promise<{
        jobId: string;
        status: import(".prisma/client").$Enums.JobStatus;
    }>;
    getJobStatus(jobId: string, userId?: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.JobStatus;
        progress: number;
        options: import("@prisma/client/runtime/library").JsonValue;
        errorCode: string | null;
        errorMessage: string | null;
        inputFiles: {
            id: string;
            name: string;
        }[];
        outputFiles: {
            id: string;
            name: string;
            size: string;
        }[];
    }>;
}
