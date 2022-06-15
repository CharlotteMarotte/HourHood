// var express = require('express');
// var router = express.Router();
// const db = require('../model/helper');

// /**
//  * Helpers
//  **/
//  async function sendAllAuthors(res) {
//   // We don't need try/catch here because we're always called from within one
//   let results = await db('SELECT * FROM authors ORDER BY lastName, firstName');
//   res.send(results.data);
// }

// // GET all users
// router.get('/', async function(req, res) {
//   try {
//       sendAllAuthors(res);
//   } catch (err) {
//       res.status(500).send({ error: err.message });
//   }
// });
