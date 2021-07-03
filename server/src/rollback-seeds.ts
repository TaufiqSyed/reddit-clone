import * as Knex from 'knex'
import tableNames from './constants/table-names'
import connection from './db'
;(async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex(tableNames.comment).del()
  await knex(tableNames.postVote).del()
  await knex(tableNames.post).del()
  await knex(tableNames.user).del()
})(connection)
console.log('Dropped all tables. Press Ctrl + C to exit.')
