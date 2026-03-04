import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StorageService {
    private readonly s3Client: S3Client;

    constructor() {
        this.s3Client = new S3Client({
            region: process.env.S3_REGION || 'us-east-1',
            endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY || 'minioadmin',
                secretAccessKey: process.env.S3_SECRET_KEY || 'minioadmin',
            },
            forcePathStyle: true, // Needed for MinIO/R2
        });
    }

    async upload(buffer: Buffer, key: string, mimeType: string, bucket: string): Promise<string> {
        try {
            const command = new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: buffer,
                ContentType: mimeType,
            });

            await this.s3Client.send(command);
            return key;
        } catch (error) {
            console.error('S3 Upload Error:', error);
            throw new InternalServerErrorException('Failed to upload file to storage');
        }
    }

    async getSignedDownloadUrl(key: string, bucket: string, expiresIn: number = 3600): Promise<string> {
        try {
            const command = new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            });

            return await getSignedUrl(this.s3Client, command, { expiresIn });
        } catch (error) {
            console.error('S3 Presign Error:', error);
            throw new InternalServerErrorException('Failed to generate download url');
        }
    }

    async deleteFile(key: string, bucket: string): Promise<void> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: bucket,
                Key: key,
            });

            await this.s3Client.send(command);
        } catch (error) {
            console.error('S3 Delete Error:', error);
            // We might not want to throw an error here if cleanup fails occasionally, but good to log
        }
    }
}
