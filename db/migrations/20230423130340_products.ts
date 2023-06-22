import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary()
    table.text('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.text('title').notNullable()
    table.text('description').notNullable()
    table.json('material').notNullable()
    table.decimal('price', 15, 2).notNullable()
    table.json('gender').notNullable()
    table.json('color').notNullable()
    table.json('category').notNullable()
    table.json('card').notNullable()
    table.text('file_banner').notNullable()
    table.json('files').notNullable()
    table.json('comments')
    table.json('sales')
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products')
}

