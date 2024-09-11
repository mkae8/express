const express = require("express");
const PORT = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// CRUD
// create - post
// read - get
// update -put
// delete - delete

// ---> Create new username, password
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const doesExist = result.users.find((el) => el.username == username);

  if (!doesExist) {
    result.users.push({
      username,
      password,
    });
    await fs.writeFileSync("./db.json", JSON.stringify(result), "utf-8");
    res.send("amjillttai");
    return;
  }
  res.send("bnshde");
});

// ---> Testing  Username Password
app.put("/users", async (req, res) => {
  const { username, password } = req.body;
  const resultJson = await fs.readFileSync("./db.json", "utf-8");
  const result = JSON.parse(resultJson);
  const doesExist = result.users.find((el) => el.username == username);

  if (!doesExist || doesExist.password !== password) {
    res.status(400).send("taarsngue ali neg n");
    return;
  }

  res.send("nevterlee");
});

app.listen(PORT, () => {
  console.log(`enender asav localhost${PORT}`);
});
