import knex from "../db/knex";
import { Address } from "../models/Address";

export class AddressRepository {
  static async getByUserId(userId: number): Promise<Address | undefined> {
    return knex("addresses").where({ user_id: userId }).first();
  }

  static async create(address: Address): Promise<Address> {
    const [id] = await knex("addresses").insert(address);
    return { ...address, id };
  }

  static async update(userId: number, address: Partial<Address>): Promise<number> {
    return knex("addresses").where({ user_id: userId }).update(address);
  }
}
