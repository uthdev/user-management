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
    try {
      // Get total count of users
      const totalCountResult = await knex("users").count("id as total").first();
      const totalCount = totalCountResult ? Number(totalCountResult.total) : 0;

      // Fetch paginated users
      const users: User[] = await knex("users")
        .limit(pageSize)
        .offset(pageNumber * pageSize);

      // Return formatted paginated response
      return new PaginatedUsers(users, totalCount, pageSize, pageNumber);
    } catch (error) {
      throw new Error("Error fetching users");
    }
  }

  static async getCount() {
    try {
      return await knex("users").count("id as total").first();
    } catch (error) {
      throw new Error("Error fetching user count");
    }
  }

  static async getById(id: number) {
    try {
      return await knex("users").where({ id }).first();
    } catch (error) {
      throw new Error("Error fetching user details");
    }
  }

  static async getByEmail(email: string) {
    try {
      return await knex("users").where({ email }).first();
    } catch (error) {
      throw new Error("Error fetching user details");
    }
  }

  static async create(user: User) {
    try {
      const [id] = await knex("users").insert(user);
      return { id, ...user };
    } catch (error) {
      throw new Error("Error creating user");
    }
  }
}
