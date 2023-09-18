import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683661486438 implements MigrationInterface {
    name = 'InitialMigration1683661486438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(12,2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "value" TYPE numeric(10,2)`);
    }

}
