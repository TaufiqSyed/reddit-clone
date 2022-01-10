import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.user).del()
  const jsonData = [
    {
      username: 'Kelli_House',
      password: 'Colombia123!',
    },
    {
      username: 'Benton_Carson',
      password: 'Bulgaria123!',
    },
    {
      username: 'Coleman_Jacobs',
      password: 'Philippines123!',
    },
    {
      username: 'Alejandra_Baldwin',
      password: 'Yemen123!',
    },
    {
      username: 'Petty_Shepherd',
      password: 'Kenya123!',
    },
  ]
  await knex(tableNames.user).insert(jsonData)
}
