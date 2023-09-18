import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683745498193 implements MigrationInterface {
    name = 'InitialMigration1683745498193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "time" TO "hour"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" RENAME COLUMN "hour" TO "time"`);
    }

}
