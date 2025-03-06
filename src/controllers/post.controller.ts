import { Request, Response } from "express";
import { PostRepository } from "../repositories/post.repository";

export class PostController {
  static async getPostsByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.query.userId);

      const posts = await PostRepository.getByUserId(userId);
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch posts", error: error.message });
    }
  }

  static async createPost(req: Request, res: Response) {
    try {
      const { title, body, userId } = req.body;
      const post = await PostRepository.create({ title, body, user_id: userId });
      res.status(201).json(post);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create post", error: error.message });
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const postId = Number(req.params.id);

      const deleted = await PostRepository.deleteById(postId);
      if (!deleted) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Failed to delete post", error: error.message });
    }
  }
}
