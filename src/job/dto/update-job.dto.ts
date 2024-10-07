import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-job.dto';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateJobDto extends PartialType(CreateJobDto) {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsUrl()
  companyUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  howToApply?: string;

  @IsOptional()
  @IsUrl()
  companyLogo?: string;
}
