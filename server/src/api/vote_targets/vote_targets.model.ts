import { Model } from 'objection'
import tableNames from '../../constants/table-names'
import User from '../users/users.model'
import Comment from '../comments/comments.model'
import Vote from '../votes/votes.model'
import Post from '../posts/posts.model'

export default class VoteTarget extends Model {
  id!: number
  upvotes!: number
  entry_type!: string

  static get tableName() {
    return tableNames.voteTarget
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['entry_type'],

      properties: {
        id: { type: 'integer' },
        upvotes: { type: 'integer' },
        entry_type: { type: 'text' },
      },
    }
  }
}
