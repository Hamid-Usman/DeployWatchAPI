import { Project } from '../../projects/entities/project.entity';
export declare class Deployment {
    id: string;
    version: string;
    status: string;
    environment: string;
    project: Project;
    projectId: string;
    timestamp: Date;
}
