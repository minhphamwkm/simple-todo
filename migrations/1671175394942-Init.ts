import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1671175394942 implements MigrationInterface {
  name = 'Init1671175394942';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying, "password" character varying, "full_name" character varying, "date_of_birth" TIMESTAMP, "gender" character varying, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" character varying, "completed" boolean, "tag" character varying array, "remind_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "todo"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
