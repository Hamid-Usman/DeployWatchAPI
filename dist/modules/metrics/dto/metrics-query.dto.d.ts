import { MetricType } from '../entities/metric.entity';
import { PaginationDto } from '../../../common/dto/pagination.dto';
export declare class MetricsQueryDto extends PaginationDto {
    type?: MetricType;
    from?: string;
    to?: string;
}
