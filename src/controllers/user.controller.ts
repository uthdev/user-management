import { Request, Response, RequestHandler } from "express";
import { UserRepository } from "../repositories/user.repository";

export class UserController {
  static getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { pageNumber = "0", pageSize = "10" } = req.query;
      const users = await UserRepository.getAll(Number(pageNumber), Number(pageSize));
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch users", error: error.message });
    }
  };

  static getUserCount: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const count = await UserRepository.getCount();
      res.status(200).json({count});
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch user count", error: error.message });
    }
  };

  static getUserById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await UserRepository.getById(Number(id));
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to fetch user details", error: error.message });
    }
  };

  static createUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email } = req.body;
      const userExists = await UserRepository.getByEmail(email);

      if (userExists) {
        res.status(409).json({ message: "User with this email already exists" });
        return;
      }

      const newUser = await UserRepository.create({ name, email });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(500).json({ message: "Failed to create user", error: error.message });
    }
  };
}
