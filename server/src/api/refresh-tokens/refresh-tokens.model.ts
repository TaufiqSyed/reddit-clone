import { Model } from "objection"
import tableNames from "../../constants/table-names"

export default class RefreshToken extends Model {
  id!: number
  user_id!: number
  token!: string
  expires_at!: string // ISO string
  created_at!: string // ISO string 
  created_by_ip!: string
  revoked_at!: string // ISO string
  revoked_by_ip!: string
  replaced_by_token!: string
  
  async $beforeInsert() {
    console.log(await this.$knex().raw('now()')
)   
 }

  static get tableName() {
    return tableNames.user
  }  
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'token', 'expires_at', 'created_by_ip'],

      properties: {
        id!: {type: 'integer'},
        user_id!: {type: 'integer'},
        token!: {type: 'string', minLength: 1, maxLength: 255},
        expires_at!: {type: 'timestamp'},
        created_at!: {type: 'timestamp'},
        created_by_ip!: {type: 'string', minLength: 1, maxLength: 255},
        revoked_at!: {type: 'timestamp'},
        revoked_by_ip!: {type: 'string', minLength: 1, maxLength: 255},
        replaced_by_token!: {type: 'string', minLength: 1, maxLength: 255},
      }
    };}}