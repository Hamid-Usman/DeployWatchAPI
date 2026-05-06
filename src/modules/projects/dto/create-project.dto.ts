import { IsString, IsOptional, MaxLength, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Awesome Service', description: 'The name of the project' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'A production API monitoring project', description: 'Brief description of the project' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 500, description: 'Latency threshold in ms to trigger an alert' })
  @IsNumber()
  @IsOptional()
  alertThreshold?: number;

  @ApiPropertyOptional({ example: 'admin@example.com', description: 'Email to notify on alerts' })
  @IsString()
  @IsOptional()
  alertEmail?: string;
}
