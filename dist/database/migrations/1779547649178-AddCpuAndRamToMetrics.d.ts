import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddCpuAndRamToMetrics1779547649178 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
