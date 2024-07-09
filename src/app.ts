import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes";
import taskRouter from "./routes/tasks.route"; 
import analyzer from "./routes/analyzer.route"
import path from "path";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/tasks", taskRouter); // Added forward slash
app.use("/api/v1/analyze",analyzer);
app.use("/api/profile-photo",express.static(path.join(__dirname, "../lib/uploads")));
export { app };

