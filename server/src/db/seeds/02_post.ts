import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.post).del()
  const jsonData = [
    {
      title: 'Alaska',
      content: 'Equicom',
      user_id: 1,
    },
    {
      title: 'New Hampshire',
      content: 'Daisu',
      user_id: 2,
    },
    {
      title: 'Wisconsin',
      content: 'Applidec',
      user_id: 4,
    },
    {
      title: 'Illinois',
      content: 'Visalia',
      user_id: 3,
    },
    {
      title: 'Louisiana',
      content: 'Telpod',
      user_id: 3,
    },
    {
      title: 'Guam',
      content: 'Nixelt',
      user_id: 2,
    },
  ]
  await knex(tableNames.post).insert(jsonData)
}
