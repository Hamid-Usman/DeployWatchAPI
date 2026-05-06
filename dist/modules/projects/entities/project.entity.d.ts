import { User } from '../../users/entities/user.entity';
import { Metric } from '../../metrics/entities/metric.entity';
import { Deployment } from '../../deployments/entities/deployment.entity';
export declare class Project {
    id: string;
    name: string;
    description: string;
    apiKey: string;
    alertThreshold: number;
    alertEmail: string;
    user: User;
    userId: string;
    metrics: Metric[];
    deployments: Deployment[];
    createdAt: Date;
    updatedAt: Date;
}
