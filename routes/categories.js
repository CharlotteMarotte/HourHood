var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/**
 * Helpers
 **/
 async function sendAllCategories(res) {
  // We don"t need try/catch here because we're always called from within one
  let results = await db("SELECT * FROM service_categories ORDER BY category_title");
  res.send(results.data);
}

// GET all categories
router.get("/", async function(req, res) {
  try {
      sendAllCategories(res);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});


module.exports = router;