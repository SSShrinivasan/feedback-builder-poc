
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/feedback", (req, res) => {
  console.log("======= RECEIVED JSON =======");
  console.log(JSON.stringify(req.body, null, 2));
  console.log("=============================");

  res.json({ success: true });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});