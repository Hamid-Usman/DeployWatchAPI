import { Project } from '../../projects/entities/project.entity';
export declare enum MetricType {
    LATENCY = "latency",
    HEALTH = "health",
    CPU = "cpu",
    RAM = "ram"
}
export declare class Metric {
    id: string;
    type: MetricType;
    value: number;
    project: Project;
    projectId: string;
    timestamp: Date;
}
