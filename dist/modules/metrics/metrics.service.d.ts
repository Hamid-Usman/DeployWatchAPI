import { Repository } from 'typeorm';
import { Metric } from './entities/metric.entity';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsGateway } from './metrics.gateway';
import { Project } from '../projects/entities/project.entity';
import { MetricsQueryDto } from './dto/metrics-query.dto';
export declare class MetricsService {
    private readonly metricRepository;
    private readonly metricsGateway;
    private readonly logger;
    constructor(metricRepository: Repository<Metric>, metricsGateway: MetricsGateway);
    create(createMetricDto: CreateMetricDto, project: Project): Promise<Metric>;
    findByProject(projectId: string, query: MetricsQueryDto): Promise<{
        data: Metric[];
        total: number;
        page: number;
        limit: number;
    }>;
}
