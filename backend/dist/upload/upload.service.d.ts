import { PrismaService } from '../common/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
export declare class UploadService {
    private readonly prisma;
    private readonly storage;
    private readonly inputBucket;
    constructor(prisma: PrismaService, storage: StorageService);
    uploadFile(file: Express.Multer.File, userId?: string): Promise<{
        fileId: string;
        fileName: string;
        size: string;
        expiresAt: Date;
    }>;
    getFileStatus(fileId: string, userId?: string): Promise<{
        fileId: string;
        status: import(".prisma/client").$Enums.FileStatus;
        expiresAt: Date;
    }>;
}
