import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

@Entity('deployments')
export class Deployment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  version: string;

  @Column({ length: 50, default: 'success' })
  status: string;

  @Column({ length: 50, default: 'production' })
  environment: string;

  @ManyToOne(() => Project, (project) => project.deployments)
  project: Project;

  @Column()
  projectId: string;

  @CreateDateColumn()
  timestamp: Date;
}
