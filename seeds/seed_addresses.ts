import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("addresses").del();

  // Inserts seed entries (each user has one address)
  await knex("addresses").insert([
    { id: 1, street: "123 Main St", city: "New York", state: "NY", zip_code: "10001", user_id: 1 },
    { id: 2, street: "456 Maple Ave", city: "Los Angeles", state: "CA", zip_code: "90001", user_id: 2 },
    { id: 3, street: "789 Oak Dr", city: "Chicago", state: "IL", zip_code: "60601", user_id: 3 }
  ]);
}
