const express = require("express");
const PORT = 8000;
const app = express();
app.use(express.json());
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");



app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
