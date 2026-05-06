"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('app.port') ?? 3000;
    const apiPrefix = configService.get('app.apiPrefix') ?? 'api';
    const nodeEnv = configService.get('app.nodeEnv') ?? 'development';
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: nodeEnv === 'production' ? process.env.ALLOWED_ORIGINS?.split(',') : '*',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    });
    app.setGlobalPrefix(apiPrefix);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    if (nodeEnv !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('DeployWatch API')
            .setDescription('Observability platform for monitoring deployments, tracking API latency, and visualizing server health.')
            .setVersion('1.0')
            .addBearerAuth()
            .addTag('Auth', 'Authentication endpoints')
            .addTag('Projects', 'Project management endpoints')
            .addTag('Metrics', 'Performance metrics ingestion and retrieval')
            .addTag('Deployments', 'Deployment tracking and history')
            .addTag('Users', 'User management endpoints')
            .addTag('Health', 'Health check endpoints')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(`${apiPrefix}/docs`, app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            },
        });
        logger.log(`Swagger docs: http://localhost:${port}/${apiPrefix}/docs`);
    }
    await app.listen(port);
    logger.log(`Application running on: http://localhost:${port}/${apiPrefix}`);
    logger.log(`Environment: ${nodeEnv}`);
}
bootstrap();
//# sourceMappingURL=main.js.map