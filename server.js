import "dotenv/config";
import express from "express";
import playerRoutes from "./routes/playerRoutes.js";
import { connectDatabase } from "./config/database.js";

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

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error.message);
    process.exit(1);
  }
}

startServer();// hotfix: correct the startup log message
