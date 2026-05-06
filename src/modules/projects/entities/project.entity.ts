import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Metric } from '../../metrics/entities/metric.entity';
import { Deployment } from '../../deployments/entities/deployment.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ unique: true })
  apiKey: string;

  @Column({ type: 'float', default: 500 }) // Default 500ms
  alertThreshold: number;

  @Column({ nullable: true })
  alertEmail: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;


  @OneToMany(() => Metric, (metric) => metric.project)
  metrics: Metric[];

  @OneToMany(() => Deployment, (deployment) => deployment.project)
  deployments: Deployment[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
