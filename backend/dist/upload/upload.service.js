"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../common/prisma/prisma.service");
const storage_service_1 = require("../storage/storage.service");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
let UploadService = class UploadService {
    prisma;
    storage;
    inputBucket = process.env.S3_BUCKET_INPUT || 'pdfforge-input';
    constructor(prisma, storage) {
        this.prisma = prisma;
        this.storage = storage;
    }
    async uploadFile(file, userId) {
        if (!file) {
            throw new common_1.BadRequestException('No file provided');
        }
        const maxFileSize = userId ? 100 * 1024 * 1024 : 25 * 1024 * 1024;
        if (file.size > maxFileSize) {
            throw new common_1.BadRequestException(`File exceeds maximum allowed size of ${maxFileSize / (1024 * 1024)}MB`);
        }
        const ext = path.extname(file.originalname);
        const storageKey = `uploads/${(0, uuid_1.v4)()}${ext}`;
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        try {
            await this.storage.upload(file.buffer, storageKey, file.mimetype, this.inputBucket);
            const fileRecord = await this.prisma.file.create({
                data: {
                    originalName: file.originalname,
                    storedName: storageKey,
                    mimeType: file.mimetype,
                    size: file.size,
                    storageKey,
                    bucket: this.inputBucket,
                    status: 'UPLOADED',
                    userId: userId || null,
                    expiresAt,
                },
            });
            return {
                fileId: fileRecord.id,
                fileName: fileRecord.originalName,
                size: fileRecord.size.toString(),
                expiresAt: fileRecord.expiresAt,
            };
        }
        catch (error) {
            console.error('File Upload Pipeline Error:', error);
            throw new common_1.InternalServerErrorException('Failed to process file upload');
        }
    }
    async getFileStatus(fileId, userId) {
        const file = await this.prisma.file.findUnique({
            where: { id: fileId },
        });
        if (!file) {
            throw new common_1.BadRequestException('File not found');
        }
        if (userId && file.userId && file.userId !== userId) {
            throw new common_1.BadRequestException('Cannot access this file');
        }
        return {
            fileId: file.id,
            status: file.status,
            expiresAt: file.expiresAt,
        };
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService])
], UploadService);
//# sourceMappingURL=upload.service.js.map