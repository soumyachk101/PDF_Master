"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const bullmq_2 = require("bullmq");
const prisma_service_1 = require("../common/prisma/prisma.service");
let JobsService = class JobsService {
    jobsQueue;
    prisma;
    constructor(jobsQueue, prisma) {
        this.jobsQueue = jobsQueue;
        this.prisma = prisma;
    }
    async createJob(userId, toolType, fileIds, options = {}) {
        if (!fileIds || fileIds.length === 0) {
            throw new common_1.BadRequestException('At least one file is required');
        }
        const files = await this.prisma.file.findMany({
            where: { id: { in: fileIds } },
        });
        if (files.length !== fileIds.length) {
            throw new common_1.BadRequestException('One or more files not found');
        }
        const job = await this.prisma.job.create({
            data: {
                userId,
                toolType,
                status: 'QUEUED',
                priority: 3,
                options,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000),
            },
        });
        await Promise.all(fileIds.map((fileId, index) => this.prisma.jobFile.create({
            data: {
                jobId: job.id,
                fileId,
                role: 'INPUT',
                sortOrder: index,
            },
        })));
        await this.jobsQueue.add(toolType, {
            jobId: job.id,
            files: files.map(f => ({ id: f.id, storageKey: f.storageKey, originalName: f.originalName })),
            options,
        }, { jobId: job.id });
        return { jobId: job.id, status: job.status };
    }
    async getJobStatus(jobId, userId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
            include: {
                jobFiles: {
                    include: { file: true },
                },
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (userId && job.userId && job.userId !== userId) {
            throw new common_1.BadRequestException('Cannot access this job');
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
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bullmq_1.InjectQueue)('pdf-jobs')),
    __metadata("design:paramtypes", [bullmq_2.Queue,
        prisma_service_1.PrismaService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map