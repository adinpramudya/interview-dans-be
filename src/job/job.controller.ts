// src/job/job.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { ApiResponse } from 'src/common/ApiResponse/api-response';
import { PageableDto } from 'src/common/dto/pageable.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { ApiJob, ApiMaster } from 'src/constant';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller(ApiMaster)
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post(ApiJob)
  create(@Body() createJobDto: CreateJobDto): Promise<ApiResponse<Job>> {
    return this.jobService.create(createJobDto);
  }

  @Get(ApiJob)
  getAll(@Query() query: PageableDto) {
    return this.jobService.findAll(query);
  }

  @Get(ApiJob + '/:id')
  findOne(@Param('id') id: string): Promise<ApiResponse<Job>> {
    return this.jobService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJobDto: CreateJobDto,
  ): Promise<ApiResponse<Job>> {
    return this.jobService.update(id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ApiResponse<Job>> {
    return this.jobService.remove(id);
  }
}
