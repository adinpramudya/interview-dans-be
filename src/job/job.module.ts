// src/job/job.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { Job } from './entities/job.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  controllers: [JobController],
  providers: [JobService, JwtService],
})
export class JobModule {}
