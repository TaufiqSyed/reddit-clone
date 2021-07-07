import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.user).del()
  const jsonData = [
    {
      username: 'Kelli_House',
      password: 'Colombia',
    },
    {
      username: 'Benton_Carson',
      password: 'Bulgaria',
    },
    {
      username: 'Coleman_Jacobs',
      password: 'Philippines',
    },
    {
      username: 'Alejandra_Baldwin',
      password: 'Yemen',
    },
    {
      username: 'Petty_Shepherd',
      password: 'Kenya',
    },
  ]
  await knex(tableNames.user).insert(jsonData)
}
