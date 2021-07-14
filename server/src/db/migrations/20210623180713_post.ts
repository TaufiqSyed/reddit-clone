import Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.post, table => {
    table
      .integer('id')
      .primary()
      .references(tableNames.voteTarget + '.id')
    table.string('title').notNullable()
    table.string('content')
    table
      .integer('user_id')
      .references(tableNames.user + '.id')
      .notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.post)
}
