var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");


/**
 * Register a user
 **/

router.post("/signup", async (req, res) => {
    let { first_name, last_name, street, house_number, city_code, city_name, country, email, user_description, hobbies, superpower, photo, password } = req.body;
    
    user_description = user_description.replaceAll(/"/, '\"');

    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        let sql = `
            INSERT INTO users (first_name, last_name, street, house_number, city_code, city_name, country, email, user_description, hobbies, superpower, photo, password)
            VALUES ("${first_name}", "${last_name}", "${street}", "${house_number}", ${city_code}, "${city_name}", "${country}", "${email}", "${user_description}", "${hobbies}", "${superpower}", "${photo}", "${hashedPassword}");
        `;
        await db(sql);
        res.send({ message: "Registration succeeded" });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


/**
 * Log in a user
 **/



router.post("/login", async (req, res) => {
    let { email, password } = req.body;

    try {
         
        let sql = `
            SELECT users.*, photos.filename AS uploadedPhoto, photos.id AS fk_photos_id
            FROM users 
            LEFT JOIN photos ON photos.fk_user_id = users.id
            WHERE email = "${email}"`;

        let results = await db(sql);
        if (results.data.length === 0) {
            // Username not found
            res.status(401).send({ error: "Login failed" });
        } else {
            let user = results.data[0];  // the user"s row/record from the DB
            let passwordsEqual = await bcrypt.compare(password, user.password);
            if (passwordsEqual) {
                // Passwords match
                let payload = { userId: user.id };
                // Create token containing user ID
                let token = jwt.sign(payload, SECRET_KEY);
                // Also return user (without password)
                delete user.password;
                res.send({
                    message: "Login succeeded",
                    token: token,
                    user: user
                });
            } else {
                // Passwords don"t match
                res.status(401).send({ error: "Login failed" });
            }
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;