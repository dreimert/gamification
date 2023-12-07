import express from "express";
import db from "../db/conn.js";

const router = express.Router();

router.get("/hello", async (req, res) => {
  res.send("Hello le monde!");
});

router.get("/", async (req, res) => {
  let collection = await db.collection("posts");
  let results = await collection.find({})
      .limit(50)
      .toArray();
  res.send(results).status(200);
});
router.post("/", async (req, res) => {
  let collection = await db.collection("posts");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});
export default router;
