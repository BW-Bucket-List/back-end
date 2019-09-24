// Update with your config settings.

//fake Postgres Config for Knex Setup
const localPg = {
  host: "localhost",
  database: "db",
  user: "user",
  password: "password123"
};

// Tell production environment to look at environment variable for DB url
const productionDBConnection = process.env.DATABASE_URL || localPg;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/bucketList.db3"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: { directory: "./database/seeds" }
  },
  production: {
    client: "pg",
    connection: productionDBConnection, //object or string
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
