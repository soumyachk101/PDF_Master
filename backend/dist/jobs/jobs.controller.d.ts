import { JobsService } from './jobs.service';
import { JobType } from '@prisma/client';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    createJob(body: {
        toolType: JobType;
        fileIds: string[];
        options?: any;
    }, req: any): Promise<{
        jobId: string;
        status: import(".prisma/client").$Enums.JobStatus;
    }>;
    getJobStatus(id: string, req: any): Promise<{
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
