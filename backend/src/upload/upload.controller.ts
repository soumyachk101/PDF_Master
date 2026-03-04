import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Req, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('api/v1/upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Req() req: any,
    ) {
        // Determine userId if authenticated, else anonymous
        let userId = undefined;
        if (req.headers.authorization) {
            // Very basic check, in reality we'd use a better approach for optional auth
            // For now we allow anonymous uploads if no token is provided.
            // A custom guard could be used for OptionalAuthGuard.
            try {
                const token = req.headers.authorization.split(' ')[1];
                // Decode token or use a guard that allows unauthenticated attached
                // To simplify, let's keep it mostly authenticated for this PoC or check req.user if guard passed
            } catch (e) { }
        }

        if (req.user) {
            userId = req.user.userId;
        }

        return this.uploadService.uploadFile(file, userId);
    }

    @Get(':id/status')
    async getFileStatus(@Param('id') id: string, @Req() req: any) {
        let userId = req.user ? req.user.userId : undefined;
        return this.uploadService.getFileStatus(id, userId);
    }
}
