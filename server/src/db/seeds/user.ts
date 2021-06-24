import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  //   if (knex.schema.hasTable('users')) {
  //     await knex('users').del()
  //   }

  // Inserts seed entries
  await knex(tableNames.user).del()

  await knex(tableNames.user).insert([
    { username: 'testboy', password: 'evil' },
    { username: 'testboy2', password: 'eviler' },
    { username: 'testboy3', password: 'evilest' },
  ])
}
