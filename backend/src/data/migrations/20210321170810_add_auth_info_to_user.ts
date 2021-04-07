import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.text('password_hash').notNullable();
    table.text('email_confirm_token').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', table => {
    table.dropColumn('password_hash');
    table.dropColumn('email_confirm_token');
  });
}
