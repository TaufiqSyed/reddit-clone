import { Model } from 'objection'
import tableNames from '../../constants/table-names'
import User from '../users/users.model'
import Comment from '../comments/comments.model'
import Vote from '../votes/votes.model'
import VoteTarget from '../vote_targets/vote_targets.model'

export default class Post extends Model {
  id!: number
  title!: string
  content!: string
  user_id!: number

  static get tableName() {
    return tableNames.post
  }
  static get relationMappings() {
    return {
      voteTarget: {
        relation: Model.BelongsToOneRelation,
        modelClass: VoteTarget,
        join: {
          from: tableNames.post + '.id',
          to: tableNames.voteTarget + '.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: tableNames.post + '.user_id',
          to: tableNames.user + '.id',
        },
      },
      comment: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: tableNames.post + '.id',
          to: tableNames.comment + '.post_id',
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'title', 'content', 'user_id'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        content: { type: 'string', minLength: 1, maxLength: 255 },
        user_id: { type: 'integer' },
      },
    }
  }
}
