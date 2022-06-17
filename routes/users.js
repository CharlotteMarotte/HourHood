var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper');

/**
 * Helpers
 **/
 async function sendAllUsers(res) {
  // We don't need try/catch here because we're always called from within one
  let results = await db('SELECT * FROM users ORDER BY id');
  let users = results.data;
  users.forEach(u => delete u.password);  // don't return passwords
  res.send(users);
}

// GET all users
router.get('/', async function(req, res) {
  try {
      sendAllUsers(res);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// * Get user by ID.    
router.get('/:userId', ensureSameUser, async function(req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT * FROM users WHERE id = ${userId}`;
  
  try {
      let results = await db(sql);
      // We know user exists because he/she is logged in!
      let user = results.data[0];
      delete user.password;  // don't return the password
      res.send(user);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

// * PUT method (edit information in user profile)
router.put("/:userId", async (req, res) => {
  let { userId } = req.params;
  console.log(userId)
  let { first_name, last_name, street, house_number, city_code, city_name, country, email, user_description, hobbies, superpower, photo } = req.body;

  try {
      let result = await db(`SELECT * FROM users WHERE id = ${userId}`);  // does user exist?
      if (result.data.length === 0) {
          res.status(404).send({ error: 'User not found' });
      } else {
          let sql = `
              UPDATE users 
              SET first_name = '${first_name}', last_name = '${last_name}', street = '${street}', house_number = '${house_number}', city_code = ${city_code}, city_name = '${city_name}', country = '${country}', email = '${email}', user_description = '${user_description}', hobbies = '${hobbies}', superpower = '${superpower}', photo = '${photo}'
              WHERE id = ${userId}
          `;

          await db(sql);  // update user
          let result = await db('SELECT * FROM users');
          let users = result.data;
          users.forEach(u => delete u.password);  // don't return passwords
          res.send(users);  // return updated array
      }
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

//DELETE user
router.delete("/:userId", async (req, res) => {
  let { userId } = req.params;

  try {
      let result = await db(`SELECT * FROM users WHERE id = ${userId}`);  // does user exist?
      if (result.data.length === 0) {
          res.status(404).send({ error: 'User not found' });
      } else {
          await db(`DELETE FROM users WHERE id = ${userId}`);  // delete user
          result = await db('SELECT * FROM users');
          let users = result.data;
          users.forEach(u => delete u.password);  // don't return passwords
          res.send(users);  // return updated array
      } 
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

module.exports = router;