import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('payment', (table) => {
    table.uuid('id').primary()
    table.json('product')
    table.json('user')
    table.text('status')
    table.text('code_pix')
    table.text('code_user')
    table.text('code_product')
    table.timestamp('create_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('payment')
}
