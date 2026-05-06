"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialMigration1778026572662 = void 0;
class InitialMigration1778026572662 {
    name = 'InitialMigration1778026572662';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`refreshToken\` \`refreshToken\` varchar(255) NULL DEFAULT 'NULL'`);
    }
}
exports.InitialMigration1778026572662 = InitialMigration1778026572662;
//# sourceMappingURL=1778026572662-InitialMigration.js.map