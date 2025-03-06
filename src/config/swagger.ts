import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import { Express } from "express";
import path from "path";

// Load the YAML file
const swaggerDocument = yaml.load(path.join(__dirname, "../docs/swagger.yml"));

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
