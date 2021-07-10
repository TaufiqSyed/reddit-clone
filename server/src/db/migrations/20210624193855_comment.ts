import Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.comment, table => {
    table.increments('id').primary()
    table.string('content').notNullable()
    table
      .integer('user_id')
      .references(tableNames.user + '.id')
      .notNullable()
    table
      .integer('post_id')
      .references(tableNames.post + '.id')
      .notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.comment)
}
