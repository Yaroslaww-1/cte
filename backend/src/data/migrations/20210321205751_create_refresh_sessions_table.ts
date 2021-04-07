import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('refresh_sessions', function (table) {
    table.increments('id').unique().notNullable();
    table.uuid('refresh_token_id').notNullable();
    table.string('user_agent', 200).nullable();
    table.string('fingerprint', 200).notNullable();
    table.string('ip', 15).notNullable();
    table.bigInteger('expires_in').notNullable();

    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('refresh_sessions');
}
