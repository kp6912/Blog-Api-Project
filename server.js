import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "Self Confidance",
    content:
      "Swami Vivekananda inspired the youth with his message of self-confidence and service to humanity. He urged young people to “Arise, awake, and stop not till the goal is reached,” reminding us that inner strength and determination can overcome any obstacle",
    author: "Swami Vivekanand",
    date: "2025-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Self-reliant and developed India",
    content:
      "APJ Abdul Kalam, the “Missile Man of India,” inspired millions with his vision of a self-reliant and developed India. He believed in dreaming big and working hard with discipline and integrity. His thought, “Dream, dream, dream. Dreams transform into thoughts and thoughts result in action,” continues to motivate generations.",
    author: "APJ Abdul Kalam",
    date: "2025-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Planning, Discipline ",
    content:
      "Chanakya, the ancient Indian philosopher and strategist, emphasized the importance of planning, discipline, and wisdom in leadership. His teachings on economics, politics, and ethics highlight that a strong character and intelligence are essential for success and good governance.",
    author: "Chanakya",
    date: "2025-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET all posts
app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

// GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// POST a new post
app.post("/posts", (req, res) => {
  const newId = lastId += 1;
  const post = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date(),
  };
  lastId = newId;
  posts.push(post);
  res.status(201).json(post);
});

// PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  if (req.body.author) post.author = req.body.author;

  res.json(post);
});

// DELETE a specific post by providing the post id
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  posts.splice(index, 1);
  res.json({ message: "Post deleted" });
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
 