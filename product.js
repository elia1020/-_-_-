import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /product.
const router = express.Router();

// This section will help you get a list of all the products.
router.get("/", async (req, res) => {
  let collection = await db.collection("products");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single product by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("products");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new product.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      ALTITUDE: req.body.ALTITUDE,
      HIS: req.body.HIS,
      ADI: req.body.ADI,
    };
    let collection = await db.collection("products");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product");
  }
});

// This section will help you update a product by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        ALTITUDE: req.body.ALTITUDE,
        HIS: req.body.HIS,
        ADI: req.body.ADI,
      },
    };

    let collection = await db.collection("products");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating product");
  }
});

// This section will help you delete a product
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("products");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting product");
  }
});

export default router;