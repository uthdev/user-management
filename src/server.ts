import express from "express";
import  cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler";
import userRoutes from "./routes/user.routes";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use("/api", userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
