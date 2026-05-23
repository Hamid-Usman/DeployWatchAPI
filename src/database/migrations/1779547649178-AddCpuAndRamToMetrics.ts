import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCpuAndRamToMetrics1779547649178 implements MigrationInterface {
    name = 'AddCpuAndRamToMetrics1779547649178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`metrics\` CHANGE \`type\` \`type\` enum ('latency', 'health', 'cpu', 'ram') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`metrics\` CHANGE \`type\` \`type\` enum ('latency', 'health') NOT NULL`);
    }

}
