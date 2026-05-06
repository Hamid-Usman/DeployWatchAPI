import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric, MetricType } from './entities/metric.entity';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsGateway } from './metrics.gateway';
import { Project } from '../projects/entities/project.entity';

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

  async findByProject(projectId: string): Promise<Metric[]> {
    return this.metricRepository.find({
      where: { projectId },
      order: { timestamp: 'DESC' },
      take: 100,
    });
  }
}
