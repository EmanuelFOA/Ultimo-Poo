import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('fornecedor', table => {
        table.increments('id').primary();
        table.string('nome_do_fornecedor').notNullable();
        table.string('email').notNullable();
        table.string('telefone').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('fornecedor');
}