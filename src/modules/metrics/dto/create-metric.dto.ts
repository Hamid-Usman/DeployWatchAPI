import { IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MetricType } from '../entities/metric.entity';

export class CreateMetricDto {
  @ApiProperty({ enum: MetricType, example: MetricType.LATENCY })
  @IsEnum(MetricType)
  @IsNotEmpty()
  type: MetricType;

  @ApiProperty({ example: 120.5, description: 'The value of the metric (e.g. ms for latency)' })
  @IsNumber()
  @IsNotEmpty()
  value: number;
}
