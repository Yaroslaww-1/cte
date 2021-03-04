module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:11037853@127.0.0.1/cte',
  },

  staging: {
    client: 'pg',
    connection: 'postgres://postgres:11037853@127.0.0.1/cte',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: 'postgres://postgres:11037853@127.0.0.1/cte',
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
