import { Model } from 'objection'
import tableNames from '../../constants/table-names'
import connection from '../../db'
import Post from '../posts/posts.model'
import Comment from '../comments/comments.model'

Model.knex(connection)
export default class User extends Model {
  id!: number
  username!: string
  password!: string

  static get tableName() {
    return tableNames.user
  }

  static get relationMappings() {
    return {
      posts: {
        relation: Model.HasManyRelation,
        modelClass: Post,
        join: {
          from: tableNames.user + '.id',
          to: tableNames.post + '.user_id',
        },
      },
      comment: {
        relation: Model.HasManyRelation,
        modelClass: Comment,
        join: {
          from: tableNames.user + '.id',
          to: tableNames.comment + '.user_id',
        },
      },
    }
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
      },
    }
  }
}
