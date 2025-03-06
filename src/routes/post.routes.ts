import express, { query } from "express";
import { PostController } from "../controllers/post.controller";
import { validateBody, validateParams, validateQuery } from "../middlewares/validate";
import { createPostSchema, querySchema, paramSchema } from "../validations/post.validation";
querySchema
const router = express.Router();

router.get("/posts", validateQuery(querySchema), PostController.getPostsByUser);
router.post("/posts", validateBody(createPostSchema), PostController.createPost);
router.delete("/posts/:id", validateParams(paramSchema) ,PostController.deletePost);

export default router;
