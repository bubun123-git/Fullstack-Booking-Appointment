const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000; // Define the port variable

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Swapna@123",
  database: "bubun_database",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database");
});

app.post("/submit", (req, res) => {
  const { name, email, phone } = req.body;

  const query = "INSERT INTO form_table (name, phone, email) VALUES (?, ?, ?)";
  db.query(query, [name, phone, email], (err, result) => {
    if (err) {
      console.log("Error Inserting Data");
      res.status(500).send("Error Inserting Data");
      return;
    }
    res.status(200).send("Data Inserted Successfully");
  });
});

app.get("/appointments", (req, res) => {
  const query = "SELECT * FROM form_table";
  db.query(query, (err, results) => {
    if (err) {
      console.log("Error Retrieving Data");
      res.status(500).send("Error Retrieving Data");
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
