import knex from "../../src/db/knex";

beforeAll(async () => {
  await knex.migrate.latest();
  await knex.seed.run();
});

beforeEach(async () => {
  await knex("users").truncate();  // Truncate tables before each test
  await knex("addresses").truncate();
  await knex("posts").truncate();
});

afterAll(async () => {
  await knex.destroy();  // Close database connection
});
