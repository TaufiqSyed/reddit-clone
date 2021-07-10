import Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.post, table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.string('content').notNullable()
    table
      .integer('user_id')
      .references(tableNames.user + '.id')
      .notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.post)
}
