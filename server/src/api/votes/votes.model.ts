import { Model, QueryContext } from 'objection'
import tableNames from '../../constants/table-names'
import Post from '../posts/posts.model'
import User from '../users/users.model'
import VoteTarget from '../vote_targets/vote_targets.model'

export default class Vote extends Model {
  id!: number
  user_id!: number
  vote_target_id!: number
  vote_score!: number
  static get tableName() {
    return tableNames.vote
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: tableNames.vote + '.user_id',
          to: tableNames.user + '.id',
        },
      },
      voteTarget: {
        relation: Model.BelongsToOneRelation,
        modelClass: VoteTarget,
        join: {
          from: tableNames.vote + '.vote_target_id',
          to: tableNames.user + '.id',
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['vote_target_id', 'user_id', 'vote_score'],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        vote_target_id: { type: 'integer' },
        vote_score: { type: 'integer' },
      },
    }
  }
}
