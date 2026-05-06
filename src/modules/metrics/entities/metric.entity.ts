import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Project } from '../../projects/entities/project.entity';

export enum MetricType {
  LATENCY = 'latency',
  HEALTH = 'health',
}

@Entity('metrics')
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MetricType })
  type: MetricType;

  @Column({ type: 'float' })
  value: number;

  @ManyToOne(() => Project, (project) => project.metrics)
  project: Project;

  @Column()
  projectId: string;

  @CreateDateColumn()
  timestamp: Date;
}
