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
exports.DeploymentsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const deployments_service_1 = require("./deployments.service");
const create_deployment_dto_1 = require("./dto/create-deployment.dto");
const api_key_guard_1 = require("../../common/guards/api-key.guard");
const public_decorator_1 = require("../../common/decorators/public.decorator");
let DeploymentsController = class DeploymentsController {
    deploymentsService;
    constructor(deploymentsService) {
        this.deploymentsService = deploymentsService;
    }
    create(createDeploymentDto, req) {
        return this.deploymentsService.create(createDeploymentDto, req.project.id);
    }
    findByProject(projectId) {
        return this.deploymentsService.findByProject(projectId);
    }
};
exports.DeploymentsController = DeploymentsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Record a new deployment' }),
    (0, swagger_1.ApiHeader)({ name: 'x-api-key', description: 'Project API Key' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deployment_dto_1.CreateDeploymentDto, Object]),
    __metadata("design:returntype", void 0)
], DeploymentsController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':projectId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get deployments for a project' }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DeploymentsController.prototype, "findByProject", null);
exports.DeploymentsController = DeploymentsController = __decorate([
    (0, swagger_1.ApiTags)('Deployments'),
    (0, common_1.Controller)('deployments'),
    __metadata("design:paramtypes", [deployments_service_1.DeploymentsService])
], DeploymentsController);
//# sourceMappingURL=deployments.controller.js.map