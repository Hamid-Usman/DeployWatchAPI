import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import * as crypto from 'crypto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) { }

  async create(createProjectDto: CreateProjectDto, userId: string): Promise<Project> {
    const apiKey = `dw_${crypto.randomBytes(24).toString('hex')}`;
    const project = this.projectRepository.create({
      ...createProjectDto,
      apiKey,
      userId,
    });
    return this.projectRepository.save(project);
  }

  async findAll(userId: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async findByApiKey(apiKey: string): Promise<Project | null> {
    return this.projectRepository.findOne({ where: { apiKey } });
  }

  async remove(id: string, userId: string): Promise<void> {
    const project = await this.findOne(id, userId);
    await this.projectRepository.remove(project);
  }
}
