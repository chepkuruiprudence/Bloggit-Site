import express, { Express } from "express";
import cors from "cors";

import authRouter from "./routes/auth.route";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);

app.use("/api/auth", authRouter);

app.get("/", (_req, res) => {
  res.send(`<h1>Welcome to Bloggit</h1>`);
});

app.post("/", (_req, res) => {
  res.send("login successful");
});

app.post("/api/auth/logout", (req, res) => {
  res.send("logout successful");
});

app.get("/api/blogs", (req, res) => {
  res.send("returned all posts");
});

app.post("/api/blogs", (req, res) => {
  res.send("get all posts");
});

app.get("/api/blogs/:blogId", (req, res) => {
  "get a specific post";
});

app.patch("/api/blogs/:blogId", (req, res) => {
  "update a specific post";
});

app.delete("/api/blogs/:blogId", (req, res) => {
  "deleted a specific post";
});

app.patch("/api/user", (req, res) => {
  "update a users info";
});

app.patch("/api/user/password", (req, res) => {
  "update a users password";
});

app.get("/api/user/blogs", (req, res) => {
  "get all blogs belonging to a specific user";
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
