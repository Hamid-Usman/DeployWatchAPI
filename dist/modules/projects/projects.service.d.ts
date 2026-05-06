import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
export declare class ProjectsService {
    private readonly projectRepository;
    constructor(projectRepository: Repository<Project>);
    create(createProjectDto: CreateProjectDto, userId: string): Promise<Project>;
    findAll(userId: string): Promise<Project[]>;
    findOne(id: string, userId: string): Promise<Project>;
    findByApiKey(apiKey: string): Promise<Project | null>;
    remove(id: string, userId: string): Promise<void>;
}
