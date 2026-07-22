import express from "express";
import pagesRouter from "./routes/pages.js";
import apiRouter from "./routes/api.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/", pagesRouter);
app.use("/api", apiRouter);


app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  res.send(`Hello, ${name}!`);
});

app.get("/users/:userId/posts/:postId", (req, res) => {
  const { userId, postId } = req.params;
  res.send(`User ${userId}, post ${postId}`);
});

app.get("/search", (req, res) => {
  const term = req.query.term || "nothing";
  const limit = Number.parseInt(req.query.limit, 10) || 5;

  res.send(`Searching for "${term}", showing ${limit} results.`);
});

app.use((req, res) => {
  res.status(404).send("Page not found.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});