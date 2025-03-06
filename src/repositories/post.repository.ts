import knex from "../db/knex";
import { Post } from "../models/Post";

export class PostRepository {
  static async getByUserId(userId: number) {
    return await knex("posts").where({ user_id: userId });
  }

  static async create(post: Post) {
    const [id] = await knex("posts").insert(post);
    return { id, ...post };
  }

  static async deleteById(id: number) {
    const deleted = await knex("posts").where({ id }).del();
    return deleted;
  }
}
