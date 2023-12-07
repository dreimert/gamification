import express from "express";
import cors from "cors";
import "express-async-errors";
import routes from "./routes/routes.js";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
