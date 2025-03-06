import { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "database.sqlite"), // Development DB
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "test-database.sqlite"), // Test DB
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },
  production: {
    client: "sqlite3",
    connection: {
      filename: "/tmp/database.sqlite", // Store in `/tmp` so it persists during runtime
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn: any, done: any) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
  }
};

export default config;
