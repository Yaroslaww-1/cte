import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('documents', function (table) {
		table.increments('id').unique().notNullable();
		table.string('title');
		table.integer('user_id').unsigned();
		table.foreign('user_id').references('users.id');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('documents');
}
