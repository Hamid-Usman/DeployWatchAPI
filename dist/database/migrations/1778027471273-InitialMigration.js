"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1778027471273 = void 0;
class InitialMigration1778027471273 {
    name = 'InitialMigration1778027471273';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`alertEmail\` \`alertEmail\` varchar(255) NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`alertEmail\` \`alertEmail\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
    }
}
exports.InitialMigration1778027471273 = InitialMigration1778027471273;
//# sourceMappingURL=1778027471273-InitialMigration.js.map