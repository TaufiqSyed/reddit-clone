import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.comment).del()
  const jsonData = [
    {
      content: 'Et in consectetur dolor et non ipsum ut laboris anim.',
      user_id: 1,
      post_id: 1,
    },
    {
      content:
        'Quis non ad reprehenderit laboris laborum mollit consequat veniam elit. Dolore veniam eu voluptate quis.',
      user_id: 4,
      post_id: 3,
    },
    {
      content:
        'Dolor cupidatat exercitation laborum cillum velit labore dolore officia adipisicing est pariatur minim do Lorem.',
      user_id: 4,
      post_id: 6,
    },
    {
      content:
        'Tempor ut duis esse et sit quis sunt id nisi labore minim deserunt consequat. Minim culpa veniam ea eiusmod occaecat consectetur eu sit eu culpa adipisicing occaecat.',
      user_id: 5,
      post_id: 5,
    },
    {
      content:
        'Occaecat tempor proident ea dolore anim eiusmod velit. Dolore sit aliqua deserunt do fugiat et excepteur consectetur.',
      user_id: 5,
      post_id: 2,
    },
    {
      content:
        'Non incididunt elit aute veniam elit non elit deserunt eiusmod.',
      user_id: 1,
      post_id: 6,
    },
    {
      content:
        'Veniam est mollit aute voluptate elit. Aliquip ipsum eiusmod velit velit nulla amet sit quis consectetur officia fugiat dolor.',
      user_id: 2,
      post_id: 1,
    },

    {
      content:
        'Aliquip mollit aute reprehenderit qui. Nulla do amet minim culpa labore culpa duis do id eu ad.',
      user_id: 1,
      post_id: 2,
    },
    {
      content:
        'Esse dolore sint veniam ipsum dolor amet occaecat. Enim amet Lorem laborum anim irure sunt.',
      user_id: 3,
      post_id: 5,
    },
    {
      content:
        'Tempor enim eu ipsum ex ex aliquip ad nisi excepteur. Officia elit cupidatat aliqua aliquip nisi aute qui duis tempor veniam voluptate eiusmod.',
      user_id: 1,
      post_id: 4,
    },
  ]
  await knex(tableNames.comment).insert(jsonData)
}
