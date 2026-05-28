import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { MetricsGateway } from './metrics.gateway';
import { Metric } from './entities/metric.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Metric]),
    ProjectsModule,
  ],
  controllers: [MetricsController],
  providers: [MetricsService, MetricsGateway],
  exports: [MetricsService],
})
export class MetricsModule {}
