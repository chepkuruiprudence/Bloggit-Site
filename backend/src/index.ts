import express, { Express } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import blogRouter from "./routes/blog.route";
import authenticateToken from "./middlewares/authMiddleware";
import userRouter from "./routes/user.route";

import authRouter from "./routes/auth.route";

const port: number = parseInt(process.env.PORT as string, 10) || 5000;

const app = express();
app.use(express.json());



// const allowedOrigins = [
//   "http://localhost:5173",                     
//   "https://bloggit-site.vercel.app"           
// ];

app.use(cors({
  origin: [
  "http://localhost:5173",                     
  "https://bloggit-site.vercel.app"           
],
  credentials: true,           
}));
app.use("/api/auth", authRouter);
app.use("/api/blogs", authenticateToken, blogRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Bloggit</h1>`);
});

app.listen(port, () => {
  console.log(` Server is running on http://localhost:${port}`);
});
