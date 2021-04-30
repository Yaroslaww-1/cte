import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
