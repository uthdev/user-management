import express from "express";
import { UserController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate";
import { createUserSchema } from "../validations/user.validation";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/users/count", UserController.getUserCount);
router.get("/users/:id", UserController.getUserById);
router.post("/users",  validate(createUserSchema), UserController.createUser);

export default router;
