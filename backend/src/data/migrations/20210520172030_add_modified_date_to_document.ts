import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('documents', table => {
    table.string('modified_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('documents', table => {
    table.dropColumn('modified_date');
  });
}
