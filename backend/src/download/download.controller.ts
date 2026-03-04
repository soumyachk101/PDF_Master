import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../common/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Controller('api/v1/download')
export class DownloadController {
    constructor(
        private prisma: PrismaService,
        private storage: StorageService,
    ) { }

    @Get(':fileId')
    async downloadFile(@Param('fileId') fileId: string, @Res() res: Response) {
        const file = await this.prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!file) {
            throw new NotFoundException('File not found');
        }

        try {
            // In a real environment, you'd want to stream the file or redirect to S3 presigned URL
            const signedUrl = await this.storage.getSignedDownloadUrl(file.storageKey, file.bucket, 3600);

            // We will just redirect to the pre-signed URL to let AWS handle the download
            return res.redirect(signedUrl);
        } catch (e) {
            console.error(e);
            // Fallback or error
            throw new NotFoundException('Could not generate download link');
        }
    }
}
