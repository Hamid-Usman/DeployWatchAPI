import { MetricsService } from './metrics.service';
import { CreateMetricDto } from './dto/create-metric.dto';
export declare class MetricsController {
    private readonly metricsService;
    constructor(metricsService: MetricsService);
    create(createMetricDto: CreateMetricDto, req: any): Promise<import("./entities/metric.entity").Metric>;
    findByProject(projectId: string): Promise<import("./entities/metric.entity").Metric[]>;
}
