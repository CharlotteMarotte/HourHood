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
    id: row0.catId,
    title: row0.category_title,
    photo: row0.photo 
  }

  let sPost = {
    id: row0.sPostId,
    title: row0.service_title,
    description: row0.service_description,
    capacity: row0.capacity,
    category
  }

  return sPost;
}

  // Create array of post items 
//   let sPosts = [];
//   if (row0.sPostId) {
//       sPosts = results.data.map(p => ({
//           id: p.sPostId,
//           title: p.service_title,
//           description: p.service_description,
//           capacity: p.capacity,



    // }
        //   category: {
        //     catId: p.fk_category_id,
        //     title: p.category_title,
        //     photo: p.photo,
        //     },
        //   provider: {
        //     providerId: p.fk_provider_id,
        //     firstName: p.first_name,
        //     lastName: p.last_name,
        //     street: p.street,
        //     houseNumber: p.house_number,
        //     cityCode: p.city_code,
        //     cityName: p.city_name,
        //     country: p.country,
        //     email: p.email,
        //     uDescription: p.user_description,
        //     photo: p.photo
        //   }
         
    //   }));
//   }
 
  // Create exercise object
//   let exercise = {
//       id: row0.exerciseId,
//       title: row0.title,
//       category: row0.category,
//       level: row0.level,
//       items
//   };

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
        SELECT service_categories.*, service_post.*, service_categories.id AS catId, service_post.id AS sPostId
        FROM service_post 
        LEFT JOIN service_categories ON catId = sPostId
        WHERE sPostId = ${req.params.id}
        `;
        let results = await db(sql);
        // Convert DB results into "sensible" JSON
        servicePost = joinToJson(results);
        //servicePost = results.data
        console.log('I am service post', servicePost);

        res.send(servicePost);
    } catch (err) {
        res.status(500).send({ error: "problem" });
    }
});


// // POST a new post
// router.post('/', async function(req, res) {
//     let { title, pages, publisherId, authorIds } = req.body;

//     let sql = `
//         INSERT INTO posts (title, pages, publisherId)
//         VALUES ('${title}', ${pages}, ${publisherId});
//         SELECT LAST_INSERT_ID();
//     `;

//     try {
//         // Insert the post
//         let results = await db(sql);
//         // The results contain the new ID thanks to SELECT LAST_INSERT_ID()
//         let newpostId = results.data[0].insertId;

//         // Add post/authors to junction table
//         if (authorIds && authorIds.length) {
//             let vals = [];
//             for (let authId of authorIds) {
//                 vals.push( `(${newpostId}, ${authId})` );
//             }
//             let sql = `
//                 INSERT INTO posts_authors (postId, authorId) 
//                 VALUES ${vals.join(',')}
//                 `;
//             await db(sql);
//         }

//         // Set status code for "resource created" and return all posts
//         res.status(201);
//         sendAllposts(res);
//     } catch (err) {
//         res.status(500).send({ error: err.message });  
//     }
// });


// // DELETE post by ID
// router.delete('/:id', ensurepostExists, async function(req, res) {
//     // If we get here we know the post exists (thanks to guard)
//     let post = res.locals.post;

//     try {
//         // Delete post and junction table entries
//         // (thanks to ON DELETE CASCADE)
//         await db(`DELETE FROM posts WHERE id = ${post.id}`);
//         sendAllposts(res);
//     } catch (err) {
//         res.status(500).send({ error: err.message });  
//     }
// });


module.exports = router;
