import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.user, table => {
    table.increments('id').primary()
    table.string('username')
    table.string('password')
    table.boolean('admin').defaultTo(false)
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.user)
}
