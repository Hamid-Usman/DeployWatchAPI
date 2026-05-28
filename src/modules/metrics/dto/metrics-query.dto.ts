import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { MetricType } from '../entities/metric.entity';
import { PaginationDto } from '../../../common/dto/pagination.dto';

export class MetricsQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: MetricType, description: 'Filter by metric type' })
  @IsOptional()
  @IsEnum(MetricType)
  type?: MetricType;

  @ApiPropertyOptional({ description: 'Start time for metrics (ISO 8601 string)' })
  @IsOptional()
  @IsDateString()
  from?: string;

  @ApiPropertyOptional({ description: 'End time for metrics (ISO 8601 string)' })
  @IsOptional()
  @IsDateString()
  to?: string;
}
