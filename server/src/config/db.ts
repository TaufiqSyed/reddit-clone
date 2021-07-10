import knex from 'knex'
const knexfile = require('../../knexfile')

const connectionConfig = knexfile['development']
const connection = knex(connectionConfig)

export default connection
