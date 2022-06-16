var express = require('express');
var router = express.Router();
const db = require('../model/helper');

/**
 * Helpers
 **/


async function sendAllPosts(res) {
    // We don't need try/catch here because we're always called from within one
    let results = await db('SELECT * FROM service_post ORDER BY service_title');
    res.send(results.data);
}

async function ensurePostExists(req, res, next) {
    try {
        let results = await db(`SELECT * FROM service_post WHERE id = ${req.params.id}`);
        console.log('I am resuts', results);
        if (results.data.length === 1) {
            // post was found; save it in response obj for the route function to use
            res.locals.servicePost = results.data[0];
            // Let next middleware function run
            next();
        } else {
            res.status(404).send({ error: 'post not found' });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
}

// Convert the DB results into a useful JSON format:
// A post obj with nested publisher obj and nested array of author objs
function joinToJson(results) {

    // Get first row
  let row0 = results.data[0];

  let category = {
    categoryID: row0.catId, // change it
    title: row0.category_title,
    photo: row0.photo 
  }

  let user = {
    userID: row0.userId,
    firstName: row0.first_name,
    lastName: row0.last_name,
    street: row0.street,
    houseNumber: row0.house_number,
    cityCode: row0.city_code,
    cityName: row0.city_name,
    country: row0.country,
    email: row0.email,
    userDescription: row0.user_description,
    profilePicture: row0.photo
  }

  let sPost = {
    postID: row0.sPostId, //change it
    title: row0.service_title,
    description: row0.service_description,
    capacity: row0.capacity,
    donation: row0.donation,
    category,
    user
  }

  return sPost;
}

/**
 * Routes
 **/


// GET all posts
router.get('/', async function(req, res) {
    try {
        sendAllPosts(res);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

/**
 * Guards
 **/


// GET service_post by ID
router.get('/:id', ensurePostExists, async function(req, res) {
    // If we get here we know the post exists (thanks to guard)
    
    let servicePost = res.locals.servicePost;
    console.log('I am service post outside', servicePost);

    try {
        // Get service_post; we know it exists, thanks to guard
        // Use LEFT JOIN to also return authors and publisher
        let sql = `
        SELECT service_categories.*, service_post.*, users.*, service_categories.id AS catId, service_post.id AS sPostId, users.id AS userId
        FROM service_post 
        LEFT JOIN service_categories ON  service_categories.id = service_post.fk_category_id
        LEFT JOIN users ON users.id = service_post.fk_provider_id
        WHERE service_post.id = ${req.params.id}
        `;
        let results = await db(sql);
        // Convert DB results into "sensible" JSON
        servicePost = joinToJson(results);
        console.log('I am service post', servicePost);

        res.send(servicePost);
    } catch (err) {
        res.status(500).send({ error: "problem" });
    }
});


// POST a new post 
router.post('/', async function(req, res) { 

    let { service_title, service_description, capacity, donation, fk_category_id, fk_provider_id } = req.body; 
    
    let sql = ` 
    INSERT INTO service_post (service_title, service_description, capacity, donation, fk_category_id, fk_provider_id)
    VALUES ('${service_title}', '${service_description}', ${capacity}, ${donation}, ${fk_category_id}, ${fk_provider_id})`; 

    try { 
    // Insert the post
    await db(sql); 
    // Set status code for "resource created" and return all posts 
    // res.status(201).send("posted"); 
    sendAllPosts(res); 
    } catch (err) { 
    res.status(500).send({ error: err.message });  
    } 
}); 
    
     
// DELETE post by ID 
router.delete('/:id', ensurePostExists, async function(req, res) { 
    // If we get here we know the post exists (thanks to guard) 
    let post = res.locals.servicePost; 
    console.log(post);
    
    try { 
    // Delete post and other entires thanks to cascade 
    await db(`DELETE FROM service_post WHERE id = ${post.id}`); 
    sendAllPosts(res); 
    } catch (err) { 
    res.status(500).send({ error: err.message });  
    } 
}); 

module.exports = router;
