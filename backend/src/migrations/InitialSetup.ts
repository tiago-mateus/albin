import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup implements MigrationInterface {
  name = 'InitialSetup';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email varchar UNIQUE NOT NULL, name varchar, plan varchar NOT NULL DEFAULT 'free', storage_used_mb int NOT NULL DEFAULT 0, album_count int NOT NULL DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now())`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS albums (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, title varchar NOT NULL, description varchar, expires_at TIMESTAMPTZ, status varchar NOT NULL DEFAULT 'active', public_url varchar UNIQUE NOT NULL, download_count int NOT NULL DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(), CONSTRAINT fk_album_user FOREIGN KEY(user_id) REFERENCES users(id))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS photos (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), album_id uuid NOT NULL, url_original varchar NOT NULL, url_thumb varchar, size_kb int NOT NULL DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now(), CONSTRAINT fk_photo_album FOREIGN KEY(album_id) REFERENCES albums(id))`);
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS audit_logs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, type varchar NOT NULL, payload jsonb, timestamp TIMESTAMPTZ DEFAULT now(), CONSTRAINT fk_audit_user FOREIGN KEY(user_id) REFERENCES users(id))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS audit_logs');
    await queryRunner.query('DROP TABLE IF EXISTS photos');
    await queryRunner.query('DROP TABLE IF EXISTS albums');
    await queryRunner.query('DROP TABLE IF EXISTS users');
  }
}
