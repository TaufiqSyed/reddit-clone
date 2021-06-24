import * as Knex from 'knex'
import tableNames from './constants/table-names'
import connection from './db'
;(async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  await knex(tableNames.user).del()
  await knex(tableNames.post).del()
})(connection)
console.log('DONE')
