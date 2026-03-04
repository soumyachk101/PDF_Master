export declare class StorageService {
    private readonly s3Client;
    constructor();
    upload(buffer: Buffer, key: string, mimeType: string, bucket: string): Promise<string>;
    getSignedDownloadUrl(key: string, bucket: string, expiresIn?: number): Promise<string>;
    deleteFile(key: string, bucket: string): Promise<void>;
}
