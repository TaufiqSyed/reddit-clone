import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.post).del()
  const jsonData = [
    {
      title: 'Lorem ipsum dolor sit amet',
      content:
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      user_id: 1,
    },
    {
      title: 'Excepteur sint occaecat cupidatat non proident',
      content: 'unde omnis iste natus error sit voluptatem',
      user_id: 2,
    },
    {
      title: 'Duis aute irure dolor',
      content: 'Applidec',
      user_id: 4,
    },
    {
      title: 'Ut enim ad minima veniam, quis nostrum',
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
