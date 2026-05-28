import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsQueryDto } from './dto/metrics-query.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Public()
  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOperation({ summary: 'Ingest a new metric' })
  @ApiHeader({ name: 'x-api-key', description: 'Project API Key' })
  create(@Body() createMetricDto: CreateMetricDto, @Req() req: any) {
    return this.metricsService.create(createMetricDto, req.project);
  }

  @ApiBearerAuth()
  @Get(':projectId')
  @ApiOperation({ summary: 'Get paginated metrics for a project' })
  findByProject(
    @Param('projectId') projectId: string,
    @Query() query: MetricsQueryDto,
  ) {
    return this.metricsService.findByProject(projectId, query);
  }
}
