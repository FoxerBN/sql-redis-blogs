import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import { validateBody } from "./middlewares/global/validateBody";
import { notFound } from "./middlewares/global/notFound";
import { errorHandler } from "./middlewares/global/errorHandler";
import { MessageResponse } from "./interfaces/MessageResponse";
import { connectDB } from "./config/database.config";
import { logCleaner } from "./utils/log.cleaner";
//* Routes
import articleRouter from "./routes/crud.route";
import requestLogger from "./middlewares/global/winston.logger";

const app = express();
connectDB();
logCleaner();
app.use(morgan("dev"));
app.use(requestLogger)
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.json(), validateBody);

// Basic route
app.get<{}, MessageResponse>("/", (req, res) => {
  res.json({ message: "Hi there!" });
});
//* ARTICLE ROUTES
app.use("/api", articleRouter)
//* GLOBAL MIDDLEWARES
app.use(notFound);
app.use(errorHandler);


export default app;
