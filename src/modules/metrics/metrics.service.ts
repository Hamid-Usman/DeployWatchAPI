import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Metric, MetricType } from './entities/metric.entity';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsGateway } from './metrics.gateway';
import { Project } from '../projects/entities/project.entity';
import { MetricsQueryDto } from './dto/metrics-query.dto';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger('MetricsService');

  constructor(
    @InjectRepository(Metric)
    private readonly metricRepository: Repository<Metric>,
    private readonly metricsGateway: MetricsGateway,
  ) {}

  async create(createMetricDto: CreateMetricDto, project: Project): Promise<Metric> {
    const metric = this.metricRepository.create({
      ...createMetricDto,
      projectId: project.id,
    });
    const savedMetric = await this.metricRepository.save(metric);
    
    // Broadcast to real-time clients
    this.metricsGateway.broadcastMetric(project.id, savedMetric);

    // Alert Logic
    if (
      savedMetric.type === MetricType.LATENCY &&
      savedMetric.value > project.alertThreshold
    ) {
      this.logger.warn(
        `ALERT: Latency threshold exceeded for project ${project.name}! ` +
        `Value: ${savedMetric.value}ms, Threshold: ${project.alertThreshold}ms`,
      );
    }
    
    return savedMetric;
  }

  async findByProject(projectId: string, query: MetricsQueryDto): Promise<{
    data: Metric[];
    total: number;
    page: number;
    limit: number;
  }> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    const from = query.from ? new Date(query.from) : threeDaysAgo;
    const to = query.to ? new Date(query.to) : new Date();

    const where: any = {
      projectId,
      timestamp: Between(from, to),
    };

    if (query.type) {
      where.type = query.type;
    }

    const [data, total] = await this.metricRepository.findAndCount({
      where,
      order: { timestamp: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }
}
