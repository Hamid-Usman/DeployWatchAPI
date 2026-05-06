"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const metric_entity_1 = require("./entities/metric.entity");
const metrics_gateway_1 = require("./metrics.gateway");
let MetricsService = class MetricsService {
    metricRepository;
    metricsGateway;
    logger = new common_1.Logger('MetricsService');
    constructor(metricRepository, metricsGateway) {
        this.metricRepository = metricRepository;
        this.metricsGateway = metricsGateway;
    }
    async create(createMetricDto, project) {
        const metric = this.metricRepository.create({
            ...createMetricDto,
            projectId: project.id,
        });
        const savedMetric = await this.metricRepository.save(metric);
        this.metricsGateway.broadcastMetric(project.id, savedMetric);
        if (savedMetric.type === metric_entity_1.MetricType.LATENCY &&
            savedMetric.value > project.alertThreshold) {
            this.logger.warn(`ALERT: Latency threshold exceeded for project ${project.name}! ` +
                `Value: ${savedMetric.value}ms, Threshold: ${project.alertThreshold}ms`);
        }
        return savedMetric;
    }
    async findByProject(projectId) {
        return this.metricRepository.find({
            where: { projectId },
            order: { timestamp: 'DESC' },
            take: 100,
        });
    }
};
exports.MetricsService = MetricsService;
exports.MetricsService = MetricsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(metric_entity_1.Metric)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        metrics_gateway_1.MetricsGateway])
], MetricsService);
//# sourceMappingURL=metrics.service.js.map