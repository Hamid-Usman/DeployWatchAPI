import { IsString, IsOptional, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeploymentDto {
  @ApiProperty({ example: '1.0.0', description: 'Version string' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  version: string;

  @ApiPropertyOptional({ example: 'success', description: 'Status of the deployment' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  status?: string;

  @ApiPropertyOptional({ example: 'production', description: 'Target environment' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  environment?: string;
}
