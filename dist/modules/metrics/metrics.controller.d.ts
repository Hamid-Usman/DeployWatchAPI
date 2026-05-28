import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsQueryDto } from './dto/metrics-query.dto';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    create(createMetricDto: CreateMetricDto, req: any): Promise<import("./entities/metric.entity").Metric>;
    findByProject(projectId: string, query: MetricsQueryDto): Promise<{
        data: import("./entities/metric.entity").Metric[];
        total: number;
        page: number;
        limit: number;
    }>;
}
