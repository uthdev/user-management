import knex from "../db/knex";
import { User } from "../models/User";

export class PaginatedUsers {
  items: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;

  constructor(items: User[], totalCount: number, pageSize: number, currentPage: number) {
    this.items = items;
    this.totalCount = totalCount;
    this.totalPages = Math.ceil(totalCount / pageSize);
    this.currentPage = currentPage;
  }
}

export class UserRepository {
  static async getAll(pageNumber = 0, pageSize = 10): Promise<PaginatedUsers> {
    const totalCountResult = await knex("users").count("id as total").first();
    const totalCount = totalCountResult ? Number(totalCountResult.total) : 0;

    const users: User[] = await knex("users")
      .limit(pageSize)
      .offset(pageNumber * pageSize);

    return new PaginatedUsers(users, totalCount, pageSize, pageNumber);
  }

  static async getCount() {
    return await knex("users").count("id as total").first();
  }

  static async getById(id: number) {
    return await knex("users").where({ id }).first();
  }

  static async getByEmail(email: string) {
    return await knex("users").where({ email }).first();
  }

  static async create(user: User) {
    const [id] = await knex("users").insert(user);
    return { id, ...user };
  }
}
