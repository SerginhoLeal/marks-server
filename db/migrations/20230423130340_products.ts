import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.text('description').notNullable()
    table.json('gender').notNullable()
    table.text('material').notNullable()
    table.json('color').notNullable()
    table.json('category').notNullable()
    table.decimal('price', 15, 2).notNullable()
    table.json('image').notNullable()
    table.json('comments')
    table.json('sales')
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable()
    table.text('session_id').notNullable()
    table
      .text('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('products')
}

