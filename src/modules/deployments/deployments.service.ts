import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deployment } from './entities/deployment.entity';
import { CreateDeploymentDto } from './dto/create-deployment.dto';

@Injectable()
export class DeploymentsService {
  constructor(
    @InjectRepository(Deployment)
    private readonly deploymentRepository: Repository<Deployment>,
  ) {}

  async create(createDeploymentDto: CreateDeploymentDto, projectId: string): Promise<Deployment> {
    const deployment = this.deploymentRepository.create({
      ...createDeploymentDto,
      projectId,
    });
    return this.deploymentRepository.save(deployment);
  }

  async findByProject(projectId: string): Promise<Deployment[]> {
    return this.deploymentRepository.find({
      where: { projectId },
      order: { timestamp: 'DESC' },
    });
  }
}
