"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const type = configService.get('database.type');
                    const isSqlite = type === 'sqlite';
                    return {
                        type,
                        host: isSqlite ? undefined : configService.get('database.host'),
                        port: isSqlite ? undefined : configService.get('database.port'),
                        username: isSqlite
                            ? undefined
                            : configService.get('database.username'),
                        password: isSqlite
                            ? undefined
                            : configService.get('database.password'),
                        database: isSqlite
                            ? ':memory:'
                            : configService.get('database.name'),
                        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
                        synchronize: configService.get('database.synchronize'),
                        logging: configService.get('app.nodeEnv') === 'development',
                    };
                },
            }),
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map