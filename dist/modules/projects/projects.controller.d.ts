import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/entities/user.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, user: User): Promise<import("./entities/project.entity").Project>;
    findAll(user: User): Promise<import("./entities/project.entity").Project[]>;
    findOne(id: string, user: User): Promise<import("./entities/project.entity").Project>;
    remove(id: string, user: User): Promise<void>;
}
