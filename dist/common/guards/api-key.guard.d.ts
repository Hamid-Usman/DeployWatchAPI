import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ProjectsService } from '../../modules/projects/projects.service';
export declare class ApiKeyGuard implements CanActivate {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
