import express from "express";
import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
const PORT = 8000;
const app = express();
app.use(express.json());

// CRUD
// create - post
// read - get
// update -put
// delete - delete

// const randomId = Math.floor(Math.random * 9999);

// --> Create new username and password
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const doesExist = result.users.find((el) => el.username == username);
  const randomId = Math.floor(Math.random() * 9999);

  if (!doesExist) {
    result.users.push({
      username,
      password,
      postId: uuidv4(),
      userId: randomId,
    });
    await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
    res.send("nemedlee");
    return;
  }
  res.send("bnshdee bro");
});

// ---> Password username check
app.put("/users", async (req, res) => {
  const { username, password } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const check = result.users.find((el) => el.username == username);
  if (!check || check.password !== password) {
    res.status(400).send("ali neg n taarahq bn");
    return;
  }
  res.send("nevterlee");
});

// ---> All Users
app.get("/users", async (request, response) => {
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  console.log(result.users);
  response.send("Amjilttai");
});

// ---> Single user
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);

  const user = result.users.find((el) => el.userId == id);
  if (!user) {
    res.status(404).send(`user not found followind id = ${id}`);
  }
  res.send(user);
});

// ---------------------------------------------------------------->>> Hash

// ---> password hashlah
app.post("/sign-up", async (req, res) => {
  const { username, password } = req.body;
  const resultJson = fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const user = result.users.find((el) => el.username === username);

  if (user) {
    res.status(400).send("ner n davhtsaj bn");
    return;
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  result.users.push({
    username,
    password,
    Hashedpassword: hashedPassword,
  });
  await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
  res.send("success");
});

app.listen(PORT, () => {
  console.log(`ene deer asav localhost:${PORT}`);
});
