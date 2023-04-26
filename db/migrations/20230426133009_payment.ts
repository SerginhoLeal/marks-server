import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payment', (table) => {
    table.uuid('id').primary()
    table.json('product')
    table.json('user')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('payment')
}
