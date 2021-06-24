module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: '5432',
      database: 'objection-trial',

      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/db/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './src/db/seeds',
      extension: 'ts',
    },
  },
}
