import { MigrationInterface, QueryRunner } from "typeorm";

export class products1658972857447 implements MigrationInterface {
    name = 'products1658972857447'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "sku" character varying(20) NOT NULL, "price" numeric(8,2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
