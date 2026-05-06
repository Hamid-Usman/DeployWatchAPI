import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1778029227812 implements MigrationInterface {
    name = 'InitialMigration1778029227812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_361a53ae58ef7034adc3c06f09f\``);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`alertEmail\` \`alertEmail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`userId\` \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_361a53ae58ef7034adc3c06f09f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_361a53ae58ef7034adc3c06f09f\``);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`userId\` \`userId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`alertEmail\` \`alertEmail\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_361a53ae58ef7034adc3c06f09f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
