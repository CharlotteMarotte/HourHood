var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require('../model/helper');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');

/**
 * Helpers
 **/
async function sendAllUsers(res) {
  // We don't need try/catch here because we're always called from within one
  let sql = `SELECT users.*, photos.filename AS uploadedPhoto, photos.id AS fk_photos_id
             FROM users 
             LEFT JOIN photos ON photos.fk_user_id = users.id
             ORDER BY id`
             
  let results = await db(sql);
  let users = results.data;
  users.forEach((u) => delete u.password); // don't return passwords
  res.send(users);
}

// GET all users
router.get('/', async function (req, res) {
  try {
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// * Get user by ID.
router.get('/:userId', async function (req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT users.*, photos.filename AS uploadedPhoto, photos.id AS fk_photos_id
             FROM users 
             LEFT JOIN photos ON photos.fk_user_id = users.id
             WHERE users.id = ${userId}`;

  

  try {
    let results = await db(sql);
    // We know user exists because he/she is logged in!
    let user = results.data[0];
    delete user.password; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// * Get user by ID.
router.get('/:userId/wallet', async function (req, res, next) {
  let { userId } = req.params;
  let sql = `SELECT user_id,
  SUM(TIME) AS hour_balance
FROM
(SELECT sP.fk_provider_id AS user_id,
     SUM(b.estimated_time) AS TIME
FROM bookings b
INNER JOIN service_post sP ON b.fk_service_post_id = sP.id
WHERE b.booking_status = "accepted"
AND b.need_donation = FALSE
GROUP BY fk_provider_id
UNION
 ALL SELECT fk_requestor_id AS user_id,
            (SUM(estimated_time) * (-1)) AS TIME
FROM bookings
WHERE booking_status = "accepted"
AND need_donation = FALSE
GROUP BY fk_requestor_id) AS INPUT
WHERE user_id = ${userId};`;

  try {
    let results = await db(sql);
    // We know user exists because he/she is logged in!
    let userWallet = results.data[0];
    res.send(userWallet);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// * PUT method (edit information in user profile)
router.put('/:userId', async (req, res) => {
  let { userId } = req.params;
//   console.log(userId);
  let {
    first_name,
    last_name,
    street,
    house_number,
    city_code,
    city_name,
    country,
    email,
    user_description,
    hobbies,
    superpower,
    photo,
  } = req.body;

  try {
    let result = await db(`SELECT * FROM users WHERE id = ${userId}`); // does user exist?
    if (result.data.length === 0) {
      res.status(404).send({ error: 'User not found' });
    } else {
      let sql = `
              UPDATE users 
              SET first_name = "${first_name}", last_name = "${last_name}", street = "${street}", house_number = "${house_number}", city_code = ${city_code}, city_name = "${city_name}", country = "${country}", email = "${email}", user_description = "${user_description}", hobbies = "${hobbies}", superpower = "${superpower}", photo = "${photo}"
              WHERE id = ${userId}
          `;

      await db(sql); // update user
      let result = await db('SELECT * FROM users ORDER BY id');
      let users = result.data;
      users.forEach((u) => delete u.password); // don"t return passwords
      res.send(users); // return updated array
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//POST user (sign up)

router.post('/', async (req, res, next) => {
  let {
    first_name,
    last_name,
    street,
    house_number,
    city_code,
    city_name,
    country,
    email,
    user_description,
    hobbies,
    superpower,
    photo,
    password,
  } = req.body;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  let sql = `
            INSERT INTO users (first_name, last_name, street, house_number, city_code, city_name, country, email, user_description, hobbies, superpower, photo, password)
            VALUES ("${first_name}", "${last_name}", "${street}", "${house_number}", ${city_code}, "${city_name}", "${country}", "${email}", "${user_description}", "${hobbies}", "${superpower}", "${photo}", "${hashedPassword}");
            SELECT LAST_INSERT_ID();
        `;

  try {
    let userResult = await db(sql);
    let userID = userResult.data[0].insertId;

    let defaultPostSql = `INSERT INTO service_post ( service_title, service_description, capacity, donation, fk_category_id, fk_provider_id ) VALUES ( 'System Post', '', 1, 0, 1, ${userID}); SELECT LAST_INSERT_ID();`;

    // make one system post for each user who signs up
    let defaultPostResult = await db(defaultPostSql);

    // save ID of this system post
    let postID = defaultPostResult.data[0].insertId;

    // now make a bookig from admin user so user who signed up receives 5 hours on sign up
    let defaultBookingSql = `INSERT INTO bookings (booking_description, estimated_time, need_donation, booking_status, fk_requestor_id, fk_service_post_id, proposed_date ) VALUES ('', 5, 0, "accepted", 1, ${postID}, "2000-01-01 00:00:00" );`;

    await db(defaultBookingSql);

    res.status(201);
    sendAllUsers(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//DELETE user
router.delete('/:userId', async (req, res) => {
  let { userId } = req.params;

  try {
    let result = await db(`SELECT * FROM users WHERE id = ${userId}`); // does user exist?
    if (result.data.length === 0) {
      res.status(404).send({ error: 'User not found' });
    } else {
      await db(`DELETE FROM users WHERE id = ${userId}`); // delete user
      result = await db('SELECT * FROM users');
      let users = result.data;
      users.forEach((u) => delete u.password); // don't return passwords
      res.send(users); // return updated array
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
