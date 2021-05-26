import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('documents', table => {
    table.timestamp('modified_date').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('documents', table => {
    table.dropColumn('modified_date');
  });
}
