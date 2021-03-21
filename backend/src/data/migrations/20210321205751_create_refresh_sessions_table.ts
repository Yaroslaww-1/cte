import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable('refresh_sessions', function (table) {
		table.increments();
		table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
		table.uuid('refresh_token').notNullable();
		table.string('ua', 200);
		table.string('fingerprint', 200);
		table.string('ip', 15).notNullable();
		table.bigInteger('expires_in').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable('refresh_sessions');
}
