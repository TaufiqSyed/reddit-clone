import * as Knex from 'knex'
import tableNames from '../../constants/table-names'

export async function seed(knex: Knex): Promise<void> {
  await knex(tableNames.postVote).del()
  const jsonData = [
    {
      user_id: 5,
      post_id: 1,
      vote_score: 1,
    },
    {
      user_id: 4,
      post_id: 3,
      vote_score: 1,
    },
    {
      user_id: 3,
      post_id: 3,
      vote_score: 1,
    },
    {
      user_id: 4,
      post_id: 4,
      vote_score: -1,
    },
    {
      user_id: 2,
      post_id: 2,
      vote_score: 0,
    },
    {
      user_id: 1,
      post_id: 5,
      vote_score: 0,
    },
    {
      user_id: 4,
      post_id: 8,
      vote_score: 1,
    },
    {
      user_id: 2,
      post_id: 1,
      vote_score: 1,
    },
    {
      user_id: 2,
      post_id: 7,
      vote_score: 1,
    },
    {
      user_id: 5,
      post_id: 5,
      vote_score: -1,
    },
  ]
  await knex(tableNames.postVote).insert(jsonData)
}
