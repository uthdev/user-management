import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

const validate =
  (schema: ZodSchema, property: "body" | "params" | "query") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      res.status(400).json({ errors: result.error.format() });
      return;
    }

    next();
  };

export const validateBody = (schema: ZodSchema) => validate(schema, "body");
export const validateParams = (schema: ZodSchema) => validate(schema, "params");
export const validateQuery = (schema: ZodSchema) => validate(schema, "query");
