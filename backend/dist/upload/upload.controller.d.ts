import { UploadService } from './upload.service';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File, req: any): Promise<{
        fileId: string;
        fileName: string;
        size: string;
        expiresAt: Date;
    }>;
    getFileStatus(id: string, req: any): Promise<{
        fileId: string;
        status: import(".prisma/client").$Enums.FileStatus;
        expiresAt: Date;
    }>;
}
