import { Model } from 'objection'
import tableNames from '../../constants/table-names'
import connection from '../../config/db'
import Post from '../posts/posts.model'
import User from '../users/users.model'

Model.knex(connection)
export default class Comment extends Model {
  id!: number
  content!: string
  user_id!: number
  post_id!: number

  static get tableName() {
    return tableNames.comment
  }
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: tableNames.comment + '.user_id',
          to: tableNames.user + '.id',
        },
      },
      post: {
        relation: Model.BelongsToOneRelation,
        modelClass: Post,
        join: {
          from: tableNames.comment + '.post_id',
          to: tableNames.post + '.id',
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['content', 'user_id', 'post_id'],

      properties: {
        id: { type: 'integer' },
        content: { type: 'string', minLength: 1, maxLength: 255 },
        user_id: { type: 'integer' },
        post_id: { type: 'integer' },
      },
    }
  }
}
