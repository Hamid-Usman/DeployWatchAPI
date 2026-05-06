import { DeploymentsService } from './deployments.service';
import { CreateDeploymentDto } from './dto/create-deployment.dto';
export declare class DeploymentsController {
    private readonly deploymentsService;
    constructor(deploymentsService: DeploymentsService);
    create(createDeploymentDto: CreateDeploymentDto, req: any): Promise<import("./entities/deployment.entity").Deployment>;
    findByProject(projectId: string): Promise<import("./entities/deployment.entity").Deployment[]>;
}
