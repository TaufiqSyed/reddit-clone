import knex from 'knex'
// import { Model } from 'objection';

// const connectionConfig = knexfile['development']
// const connection = knex(connectionConfig)

// Model.knex(connection);

export default knex(require('../knexfile')['development'])
