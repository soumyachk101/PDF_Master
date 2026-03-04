import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService {
    private readonly inputBucket = process.env.S3_BUCKET_INPUT || 'pdfforge-input';

    constructor(
        private readonly prisma: PrismaService,
        private readonly storage: StorageService,
    ) { }

    async uploadFile(file: Express.Multer.File, userId?: string) {
        if (!file) {
            throw new BadRequestException('No file provided');
        }

        const maxFileSize = userId ? 100 * 1024 * 1024 : 25 * 1024 * 1024; // 100MB Pro, 25MB Free/Anon
        if (file.size > maxFileSize) {
            throw new BadRequestException(`File exceeds maximum allowed size of ${maxFileSize / (1024 * 1024)}MB`);
        }

        // In a real app we would use magic bytes to check true file type and use ClamAV scanning here
        const ext = path.extname(file.originalname);
        const storageKey = `uploads/${uuidv4()}${ext}`;
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour TTL

        try {
            // 1. Upload to S3
            await this.storage.upload(file.buffer, storageKey, file.mimetype, this.inputBucket);

            // 2. Save record in database
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
        } catch (error) {
            console.error('File Upload Pipeline Error:', error);
            throw new InternalServerErrorException('Failed to process file upload');
        }
    }

    async getFileStatus(fileId: string, userId?: string) {
        const file = await this.prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!file) {
            throw new BadRequestException('File not found');
        }

        // Check ownership if user is authenticated
        if (userId && file.userId && file.userId !== userId) {
            throw new BadRequestException('Cannot access this file');
        }

        return {
            fileId: file.id,
            status: file.status,
            expiresAt: file.expiresAt,
        };
    }
}
