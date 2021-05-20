import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('documents', table => {
    table.string('created_date').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('documents', table => {
    table.dropColumn('created_date');
  });
}
