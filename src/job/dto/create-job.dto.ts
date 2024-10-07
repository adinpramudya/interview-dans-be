import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsString()
  company: string;

  @IsOptional()
  @IsUrl()
  companyUrl: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  howToApply: string;

  @IsOptional()
  @IsUrl()
  companyLogo: string;
}
