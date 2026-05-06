import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectsService } from '../../modules/projects/projects.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly projectsService: ProjectsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API Key is missing');
    }

    const project = await this.projectsService.findByApiKey(apiKey);
    if (!project) {
      throw new UnauthorizedException('Invalid API Key');
    }

    // Attach project to request for use in controllers
    request.project = project;
    return true;
  }
}
