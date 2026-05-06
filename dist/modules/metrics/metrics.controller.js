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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const metrics_service_1 = require("./metrics.service");
const create_metric_dto_1 = require("./dto/create-metric.dto");
const api_key_guard_1 = require("../../common/guards/api-key.guard");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let MetricsController = class MetricsController {
    metricsService;
    constructor(metricsService) {
        this.metricsService = metricsService;
    }
    create(createMetricDto, req) {
        return this.metricsService.create(createMetricDto, req.project);
    }
    findByProject(projectId) {
        return this.metricsService.findByProject(projectId);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Ingest a new metric' }),
    (0, swagger_1.ApiHeader)({ name: 'x-api-key', description: 'Project API Key' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_metric_dto_1.CreateMetricDto, Object]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':projectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get metrics for a project' }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "findByProject", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('Metrics'),
    (0, common_1.Controller)('metrics'),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map