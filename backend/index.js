// index.js
const connectToMongo = require("./db");

connectToMongo();

const express = require("express");
const app = express();
const port = 5000;
var cors = require("cors");

const corsOptions = {
  origin: " http://192.168.29.140:3000", // Replace with your frontend's domain
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
