import { Model, QueryContext } from 'objection'
import tableNames from '../../constants/table-names'
import Post from '../posts/posts.model'
import User from '../users/users.model'

export default class PostVote extends Model {
  id!: number
  user_id!: number
  post_id!: number
  vote_score!: number
  static get tableName() {
    return tableNames.postVote
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: tableNames.postVote + '.user_id',
          to: tableNames.user + '.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: tableNames.postVote + '.post_id',
          to: tableNames.user + '.id',
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['post_id', 'user_id', 'vote_score'],

      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        post_id: { type: 'integer' },
        vote_score: { type: 'integer' },
      },
    }
  }
}
