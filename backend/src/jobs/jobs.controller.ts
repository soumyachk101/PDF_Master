import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobType } from '@prisma/client';

@Controller('api/v1/jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post()
    async createJob(@Body() body: { toolType: JobType; fileIds: string[]; options?: any }, @Req() req: any) {
        const userId = req.user ? req.user.userId : undefined;
        return this.jobsService.createJob(userId, body.toolType, body.fileIds, body.options);
    }

    @Get(':id')
    async getJobStatus(@Param('id') id: string, @Req() req: any) {
        const userId = req.user ? req.user.userId : undefined;
        return this.jobsService.getJobStatus(id, userId);
    }
}
