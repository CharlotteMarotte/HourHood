var express = require('express');
var router = express.Router();
const path = require('path');
const db = require('../model/helper');
const fs = require('fs/promises');
const multer = require('multer');

const PUBLIC_DIR_URL = 'http://localhost:5000/clientfiles';

/**
 * Multer initialization
 **/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/clientfiles'); // store files here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep original filename
  },
});
const upload = multer({ storage });

/**
 * Helper functions
 **/

async function sendAllFiles(res) {
  try {
    let results = await db('SELECT * FROM photos');
    // Add 'url' property for each file
    let withUrls = results.data.map((r) => ({
      ...r,
      url: `${PUBLIC_DIR_URL}/${r.filename}`,
    }));
    res.send(withUrls);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * Routes
 **/

/* GET files */
router.get('/', async function (req, res) {
  sendAllFiles(res);
});

/* POST a photo */
router.post('/', upload.single('clientfile'), async function (req, res) {
  let { fk_user_id } = req.body;
  // console.log("fk", req.body.fk_user_id, "fn", req.file.originalname )

  try {
    // Insert DB record; only save the filename, not the entire path
    let sql = `
            INSERT INTO photos (fk_user_id, filename)
            VALUES ('${fk_user_id}', '${req.file.originalname}')
        `;
    await db(sql);
    

    // Send array of all files as response
    res.status(201); // new resource created
    sendAllFiles(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
