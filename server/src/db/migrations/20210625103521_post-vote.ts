import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableNames.postVote, table => {
    table.increments('id').primary()
    table.integer('user_id').references(tableNames.user + '.id')
    table.integer('post_id').references(tableNames.post + '.id')
    table.integer('vote_score')
    table.unique(['user_id', 'post_id'])
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableNames.postVote)
}
