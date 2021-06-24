import dotenv from 'dotenv'
dotenv.config()

import api from './api'
import express from 'express'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', api)

app.listen(5050, () => {
  console.log('Server listening on port 5050')
})

// async function createSchema() {
//   await knex.schema.dropTableIfExists(tableNames.user)
//   await knex.schema.createTable('users', table => {
//     table.increments('id').primary();
//     table.string('username');
//     table.string('password_hash');
//   });
// }

// async function main() {
//   // Create some people.
//   const sylvester = await User.query().insertGraph({
//     username: 'Sylvester',
//     password_hash: 'password'
//   });

//   console.log('created:', sylvester);
// }

// createSchema()
//   .then(() => main())
//   .then(() => knex.destroy())
//   .catch(err => {
//     console.error(err);

//     return knex.destroy();
//   });
