// CRUD
// create - post
// read - get
// update -put
// delete - delete

const express = require("express");
const PORT = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// ---> Users
app.get("/users", async (req, res) => {
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  res.send(result.users);
});

// ---> Single user catch by id
app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const user = result.users.find((el) => el.userId === id);
  if (!user) {
    res.status(404);
    res.send(`user not found following id = ${id}`);
  }
  res.send(user);
});

// ---> Posts
app.get("/posts", async (req, res) => {
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  res.send(result.posts);
});

// ---> Post iin door id gaar n ter single postnii door commentiig haruulah
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const post = result.posts.find((el) => el.postId === id);
  if (!post) {
    res.status(404);
    res.send(`Cannot find following post by this id = ${id}`);
    return;
  }
  // ---> id gaar n ter single postnii door commentiig haruulah
  const commentsOfThisPost = result.comments.filter((el) => el.postId === id);
  res.send({
    post,
    comments: commentsOfThisPost,
  });
});

// ---> Post create hiih
app.post("/post", async (req, res) => {
  const { desc, image, userId } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const postId = uuidv4();
  const publishedAt = new Date().toISOString();

  result.posts.push({
    postId: postId,
    userId: userId,
    description: desc,
    image: image,
    publishedAt: publishedAt,
  });

  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");

  res.send("Succesfully created post");
});

// ---> Post-d comment nemeh
app.post("/comment", async (req, res) => {
  const { postId, userId, text } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const publishedAt = new Date().toISOString();

  result.comments.push({
    text,
    postId,
    userId,
    publishedAt,
  });

  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");

  res.send("Succesfully created comment");
});

// ---> commentiig id gaar n uurchiluh
app.put("/comment/:id", async (request, response) => {
  const { text } = request.body;
  const { id } = request.params;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const updateHiihGjBuiComment = result.comments.map((el) => {
    if (el.commentId == id) {
      return { ...el, text: text };
    } else {
      return el;
    }
  });
  result.comments = updateHiihGjBuiComment;
  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  response.send("Succesfully updated comment");
});

// ---> commentiig id gaar n ustgah
app.delete("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const doesCommentExist = result.comments.find((el) => el.commentId === id);
  if (!doesCommentExist) {
    res.status(400).send("bhqeen");
    return;
  }
  const deleteComments = result.comments.filter((el) => el.commentId !== id);
  result.comments = deleteComments;
  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  res.send(result.comments);
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
