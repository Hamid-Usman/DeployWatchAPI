import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { ProjectsService } from '../../modules/projects/projects.service';
import { MetricsService } from '../../modules/metrics/metrics.service';
import { MetricType } from '../../modules/metrics/entities/metric.entity';
import * as os from 'os';

@Injectable()
export class TelemetryInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TelemetryInterceptor.name);
  private readonly monitoringApiKey: string | undefined;
  private monitoringProjectPromise: Promise<any> | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly projectsService: ProjectsService,
    private readonly metricsService: MetricsService,
  ) {
    this.monitoringApiKey =
      this.configService.get<string>('monitoring.apiKey') ||
      process.env.MONITORING_API_KEY;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (!request || request.method === 'OPTIONS') {
      return next.handle();
    }

    const path = request.url || request.originalUrl || '';
    const apiPrefix = this.configService.get<string>('app.apiPrefix') || 'api';
    if (!this.monitoringApiKey || this.shouldSkipPath(path, apiPrefix)) {
      return next.handle();
    }

    const start = process.hrtime.bigint();
    return next.handle().pipe(
      finalize(() => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1e6;
        this.trackMetrics(durationMs).catch((error) => {
          this.logger.debug('Telemetry metric upload failed', error);
        });
      }),
    );
  }

  private shouldSkipPath(path: string, apiPrefix: string): boolean {
    const normalized = path.toLowerCase();
    return (
      normalized.includes(`/${apiPrefix}/metrics`) ||
      normalized.includes(`/${apiPrefix}/docs`) ||
      normalized.includes('/swagger') ||
      normalized.includes('/favicon.ico')
    );
  }

  private async trackMetrics(latencyMs: number) {
    const project = await this.getMonitoringProject();
    if (!project) {
      return;
    }

    const metrics = [
      {
        type: MetricType.LATENCY,
        value: Number(latencyMs.toFixed(2)),
      },
      {
        type: MetricType.CPU,
        value: this.getCpuUsage(),
      },
      {
        type: MetricType.RAM,
        value: this.getRamUsage(),
      },
    ];

    await Promise.all(
      metrics.map((metric) =>
        this.metricsService
          .create(metric, project)
          .catch((error) => this.logger.debug('Could not save telemetry metric', error)),
      ),
    );
  }

  private async getMonitoringProject() {
    if (!this.monitoringProjectPromise) {
      this.monitoringProjectPromise = this.projectsService
        .findByApiKey(this.monitoringApiKey)
        .catch((error) => {
          this.logger.warn('Failed to resolve monitoring project', error);
          return null;
        });
    }
    return this.monitoringProjectPromise;
  }

  private getRamUsage(): number {
    const total = os.totalmem();
    const free = os.freemem();
    return Number(((1 - free / total) * 100).toFixed(2));
  }

  private getCpuUsage(): number {
    const loadAvg = os.loadavg()[0];
    return Number(loadAvg.toFixed(2));
  }
}
