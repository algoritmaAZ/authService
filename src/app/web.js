import express from "express";
import cookieParser from "cookie-parser";
import { publicApi } from "../routes/public.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();

web.use(cookieParser());
web.use(express.json());
web.use(publicApi);

web.use(errorMiddleware);
