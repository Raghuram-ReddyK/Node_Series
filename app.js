const express = require("express");
const app = express();
const connectDB = require("./src/Utilities/DBConnection");
const routes = require("./src/Routes/hotelRouting");


connectDB();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`);
});