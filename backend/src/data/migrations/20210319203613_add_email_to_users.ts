import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.string('email', 100);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('email');
  });
}
