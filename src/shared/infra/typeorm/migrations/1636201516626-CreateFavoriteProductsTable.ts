import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFavoriteProductsTable1636201516626 implements MigrationInterface {
    name = 'CreateFavoriteProductsTable1636201516626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favoriteProducts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customerId" uuid NOT NULL, "productId" character varying NOT NULL, CONSTRAINT "PK_5b6d9972bb9e983938c5ce0fd30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favoriteProducts" ADD CONSTRAINT "FK_f504477eb4aaa84a273c4893b19" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favoriteProducts" DROP CONSTRAINT "FK_f504477eb4aaa84a273c4893b19"`);
        await queryRunner.query(`DROP TABLE "favoriteProducts"`);
    }

}
