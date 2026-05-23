"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCpuAndRamToMetrics1779547649178 = void 0;
class AddCpuAndRamToMetrics1779547649178 {
    name = 'AddCpuAndRamToMetrics1779547649178';
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`metrics\` CHANGE \`type\` \`type\` enum ('latency', 'health', 'cpu', 'ram') NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`metrics\` CHANGE \`type\` \`type\` enum ('latency', 'health') NOT NULL`);
    }
}
exports.AddCpuAndRamToMetrics1779547649178 = AddCpuAndRamToMetrics1779547649178;
//# sourceMappingURL=1779547649178-AddCpuAndRamToMetrics.js.map