"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1778029227812 = void 0;
class InitialMigration1778029227812 {
    name = 'InitialMigration1778029227812';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_361a53ae58ef7034adc3c06f09f\``);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`alertEmail\` \`alertEmail\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`userId\` \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_361a53ae58ef7034adc3c06f09f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`projects\` DROP FOREIGN KEY \`FK_361a53ae58ef7034adc3c06f09f\``);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`userId\` \`userId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`alertEmail\` \`alertEmail\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` ADD CONSTRAINT \`FK_361a53ae58ef7034adc3c06f09f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
    }
}
exports.InitialMigration1778029227812 = InitialMigration1778029227812;
//# sourceMappingURL=1778029227812-InitialMigration.js.map