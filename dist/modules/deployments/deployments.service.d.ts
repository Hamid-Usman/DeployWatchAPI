import { Repository } from 'typeorm';
import { Deployment } from './entities/deployment.entity';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
export declare class DeploymentsService {
    private readonly deploymentRepository;
    constructor(deploymentRepository: Repository<Deployment>);
    create(createDeploymentDto: CreateDeploymentDto, projectId: string): Promise<Deployment>;
    findByProject(projectId: string): Promise<Deployment[]>;
}
