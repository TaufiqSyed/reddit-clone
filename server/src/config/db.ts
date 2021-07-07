import knex from 'knex'
import { Model } from 'objection'
const knexfile = require('../../knexfile')

const connectionConfig = knexfile['development']
const connection = knex(connectionConfig)

Model.knex(connection)

export default connection
