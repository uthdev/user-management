import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("posts").del();

  // Inserts seed entries (multiple posts per user)
  await knex("posts").insert([
    { id: 1, title: "First Post", body: "This is Alice's first post.", user_id: 1 },
    { id: 2, title: "Second Post", body: "This is Bob's first post.", user_id: 2 },
    { id: 3, title: "Another Post", body: "Alice writing again!", user_id: 1 },
    { id: 4, title: "Charlie's Thoughts", body: "Charlie shares an idea.", user_id: 3 }
  ]);
}
