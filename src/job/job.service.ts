// src/job/job.service.ts
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { Job } from './entities/job.entity';
import { PageableDto } from 'src/common/dto/pageable.dto';
import { ApiResponse } from 'src/common/ApiResponse/api-response';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<ApiResponse<Job>> {
    const job = this.jobRepository.create(createJobDto);
    return new ApiResponse<Job>(
      200,
      'Job data created successfully',
      new Date(),
      await this.jobRepository.save(job),
    );
  }

  async findAll(query: PageableDto): Promise<ApiResponse<Job[]>> {
    const {
      page = 1,
      size = 10,
      sortBy = 'id',
      direction = 'ASC',
      search,
      location,
      full_time,
    } = query;
    console.log(query);
    try {
      const take = size;
      const skip = (page - 1) * size;

      const queryBuilder = this.jobRepository
        .createQueryBuilder('job')
        .orderBy(`job.${sortBy}`, direction)
        .take(take)
        .skip(skip);

      // Optional search by description or title
      if (search) {
        queryBuilder.andWhere('job.description LIKE :search', {
          search: `%${search}%`,
        });
      }

      // Optional filter by location
      if (location) {
        queryBuilder.andWhere('job.location LIKE :location', {
          location: `%${location}%`,
        });
      }

      if (full_time === true) {
        queryBuilder.andWhere('job.type = :type', { type: 'Full Time' });
      } else if (full_time === false) {
        queryBuilder.andWhere('job.type = :type', { type: 'Part Time' });
      }

      const [data, totalData] = await queryBuilder.getManyAndCount();

      return new ApiResponse<Job[]>(
        200,
        'Jobs retrieved successfully',
        new Date(),
        data,
        {
          page,
          limit: size,
          totalPage: Math.ceil(totalData / size),
          totalData,
        },
      );
    } catch (e) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving job data',
      );
    }
  }

  async findOne(id: string): Promise<ApiResponse<Job>> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return new ApiResponse<Job>(
      200,
      'Job data retrieved successfully',
      new Date(),
      job,
    );
  }

  async update(
    id: string,
    updateJobDto: CreateJobDto,
  ): Promise<ApiResponse<Job>> {
    const existingJob = await this.jobRepository.findOne({ where: { id } });
    if (!existingJob) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    await this.jobRepository.update(id, updateJobDto);

    const updatedJob = await this.jobRepository.findOne({ where: { id } });
    return new ApiResponse<Job>(
      200,
      'Job data updated successfully',
      new Date(),
      updatedJob,
    );
  }

  async remove(id: string): Promise<ApiResponse<Job>> {
    const existingJob = await this.jobRepository.findOne({ where: { id } });
    if (!existingJob) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    await this.jobRepository.remove(existingJob);

    return new ApiResponse<Job>(
      200,
      'Job data deleted successfully',
      new Date(),
      existingJob,
    );
  }
}
