const express = require("express");

const port = 8000;

const app = express();

app.get("/", (request, response) => {
  response.send("This one is Read === get");
});

app.post("/", (request, response) => {
  response.send("This one is Create  === post");
});

app.put("/", (request, response) => {
  response.send("This one is Update === put");
});

app.delete("/", (request, response) => {
  response.send("This one is Delete === delete");
});

app.listen(port, () => {
  console.log(`localhost${port}`);
});

// CRUD
// create - post
// read - get
// update -put
// delete - delete
