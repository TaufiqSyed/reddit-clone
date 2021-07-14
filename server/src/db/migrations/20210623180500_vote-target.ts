import Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.voteTarget, table => {
    table.increments('id').primary()
    table.integer('upvotes').defaultTo(0)
    table.text('entry_type').notNullable() // 'post' or 'comment'
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.voteTarget)
}
