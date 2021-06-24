import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(tableNames.post).del()

  await knex(tableNames.post).insert([
    { title: 'first post', content: 'hey', user_id: 2 },
    { title: 'second post', content: 'there', user_id: 1 },
    { title: 'third post', content: 'person', user_id: 2 },
  ])
}
