import { Knex } from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('manutencao', table => {
        table.increments('id').primary();
        table.string('nome_do_centro_de_custo').notNullable();
        table.string('nome_do_produto').notNullable();
        table.string('servico_executado').notNullable();
        table.date('data_do_servico').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('update_at').defaultTo(knex.fn.now());
        table.string('id_filial')
            .notNullable()
            .references('id')
            .inTable('filial')
        table.string('id_fornecedor')
            .notNullable()
            .references('id')
            .inTable('fornecedor')
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('manutencao');
}