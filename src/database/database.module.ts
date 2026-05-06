import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const type = configService.get<string>('database.type') as any;
        const isSqlite = type === 'sqlite';

        return {
          type,
          host: isSqlite ? undefined : configService.get<string>('database.host'),
          port: isSqlite ? undefined : configService.get<number>('database.port'),
          username: isSqlite
            ? undefined
            : configService.get<string>('database.username'),
          password: isSqlite
            ? undefined
            : configService.get<string>('database.password'),
          database: isSqlite
            ? ':memory:'
            : configService.get<string>('database.name'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('database.synchronize'),
          logging: configService.get<string>('app.nodeEnv') === 'development',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
