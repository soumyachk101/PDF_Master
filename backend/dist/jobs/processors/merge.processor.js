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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const storage_service_1 = require("../../storage/storage.service");
const uuid_1 = require("uuid");
let MergeProcessor = class MergeProcessor extends bullmq_1.WorkerHost {
    prisma;
    storage;
    constructor(prisma, storage) {
        super();
        this.prisma = prisma;
        this.storage = storage;
    }
    async process(job) {
        const { jobId, files, options } = job.data;
        if (job.name !== 'MERGE' && job.name !== 'SPLIT' && job.name !== 'COMPRESS') {
            console.log(`Job skipped by MergeProcessor (unsupported type: ${job.name})`);
            return;
        }
        try {
            await this.prisma.job.update({
                where: { id: jobId },
                data: { status: 'PROCESSING', progress: 10, startedAt: new Date() },
            });
            console.log(`[Worker] Started processing job ${jobId} of type ${job.name}`);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await job.updateProgress(40);
            await this.prisma.job.update({ where: { id: jobId }, data: { progress: 40 } });
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await job.updateProgress(80);
            await this.prisma.job.update({ where: { id: jobId }, data: { progress: 80 } });
            const outputStorageKey = `processed/${(0, uuid_1.v4)()}.pdf`;
            const outputBucket = process.env.S3_BUCKET_OUTPUT || 'pdfforge-output';
            const outputFile = await this.prisma.file.create({
                data: {
                    originalName: `result_${job.name.toLowerCase()}.pdf`,
                    storedName: outputStorageKey,
                    mimeType: 'application/pdf',
                    size: 1024 * 1024 * 2,
                    storageKey: outputStorageKey,
                    bucket: outputBucket,
                    status: 'UPLOADED',
                    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
                },
            });
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
        }
        catch (error) {
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
};
exports.MergeProcessor = MergeProcessor;
exports.MergeProcessor = MergeProcessor = __decorate([
    (0, bullmq_1.Processor)('pdf-jobs'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService])
], MergeProcessor);
//# sourceMappingURL=merge.processor.js.map