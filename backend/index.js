const connectToMongo = require("./db");

connectToMongo();

const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api/auth", require("./routes/auth")); // Fixed the path to auth route
// app.use("/api/notes", require("./routes/notes")); // Uncomment if needed

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
