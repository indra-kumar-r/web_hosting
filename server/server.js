const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/add_skill", (req, res) => {
  const { skill_name } = req.body;
  const query = "INSERT INTO skills (skill_name) VALUES(?)";
  db.query(query, [skill_name], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json({ status: "success" });
    }
  });
});

app.get("/read_skill", (req, res) => {
  const query = "SELECT * FROM skills";
  db.query(query, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json({ status: "success", skills: results });
    }
  });
});

app.delete("/delete_skill", (req, res) => {
  const { id } = req.query;
  const query = "DELETE FROM skills WHERE id = ?";
  db.query(query, [id], (error, results) => {
    if (error) {
      console.log(error);
    } else {
      res.json({ status: "success" });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
