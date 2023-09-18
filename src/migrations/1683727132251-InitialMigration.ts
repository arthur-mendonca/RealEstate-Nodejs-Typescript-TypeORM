import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1683727132251 implements MigrationInterface {
    name = 'InitialMigration1683727132251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "time" TIME NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "time"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" character varying NOT NULL`);
    }

}
