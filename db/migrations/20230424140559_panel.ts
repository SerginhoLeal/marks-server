import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('panel', (table) => {
    table.uuid('id').primary()
    table
      .integer('products_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('panel')
}

