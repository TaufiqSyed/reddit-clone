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
    {
      title: 'Washington',
      content: 'Zenco',
      user_id: 5,
    },
    {
      title: 'Alabama',
      content: 'Cinaster',
      user_id: 3,
    },
    {
      title: 'Mississippi',
      content: 'Netplode',
      user_id: 3,
    },
    {
      title: 'Pennsylvania',
      content: 'Playce',
      user_id: 5,
    },
    {
      title: 'Iowa',
      content: 'Apex',
      user_id: 4,
    },
    {
      title: 'Marshall Islands',
      content: 'Comveyor',
      user_id: 2,
    },
    {
      title: 'Wyoming',
      content: 'Fossiel',
      user_id: 1,
    },
    {
      title: 'Florida',
      content: 'Grainspot',
      user_id: 2,
    },
    {
      title: 'Hawaii',
      content: 'Providco',
      user_id: 3,
    },
    {
      title: 'South Carolina',
      content: 'Vurbo',
      user_id: 2,
    },
    {
      title: 'Vermont',
      content: 'Rameon',
      user_id: 2,
    },
    {
      title: 'Virginia',
      content: 'Fleetmix',
      user_id: 5,
    },
    {
      title: 'Rhode Island',
      content: 'Podunk',
      user_id: 5,
    },
    {
      title: 'Arizona',
      content: 'Quotezart',
      user_id: 1,
    },
  ]
  await knex(tableNames.post).insert(jsonData)
}
