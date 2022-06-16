var express = require('express');
var router = express.Router();
const db = require('../model/helper');

/**
 * Helpers
 **/
async function sendAllPosts(res) {
    // We don't need try/catch here because we're always called from within one

    let sql = `
        SELECT service_categories.*, service_post.*, users.*, service_categories.id AS catId, service_post.id AS sPostId, users.id AS userId
        FROM service_post 
        LEFT JOIN service_categories ON  service_categories.id = service_post.fk_category_id
        LEFT JOIN users ON users.id = service_post.fk_provider_id
        ORDER BY id DESC
    `;
    let results = await db(sql);
    let allPosts = joinToJson(results);
    res.send(allPosts);
}


// Convert the DB results into a useful JSON format:
// A nested post obj with nested category obj and nested user obj
function joinToJson(results) {
  
    let sPost = results.data.map(row => ({
        postID: row.sPostId,
        title: row.service_title,
        description: row.service_description,
        capacity: row.capacity,
        donation: row.donation,
        category: {
            categoryID: row.catId,
            title: row.category_title,
            photo: row.photo 
        },
        user: {
            userID: row.userId,
            firstName: row.first_name,
            lastName: row.last_name,
            street: row.street,
            houseNumber: row.house_number,
            cityCode: row.city_code,
            cityName: row.city_name,
            country: row.country,
            email: row.email,
            userDescription: row.user_description,
            profilePicture: row.photo
        }
    }));
    
      return sPost;
    }

/**
 * Guards
 **/
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


// GET service_post by ID
router.get('/:id', ensurePostExists, async function(req, res) {
    // If we get here we know the post exists (thanks to guard)
    let servicePost = res.locals.servicePost;

    try {
        // Get service_post; we know it exists, thanks to guard
        // Use LEFT JOIN to also return users and service_categories
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
    // Return all posts 
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
