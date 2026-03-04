import type { Response } from 'express';
import { PrismaService } from '../common/prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
export declare class DownloadController {
    private prisma;
    private storage;
    constructor(prisma: PrismaService, storage: StorageService);
    downloadFile(fileId: string, res: Response): Promise<void>;
}
