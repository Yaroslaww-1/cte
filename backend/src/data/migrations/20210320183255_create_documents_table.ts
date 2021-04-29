import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('documents', function (table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('title');

    table.uuid('user_id');
    table.foreign('user_id').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('documents');
}
