var express = require('express');
var router = express.Router();
const db = require("../model/helper");


// * Get user by ID.
router.get('/:token', async function (req, res, next) {
  let { token } = req.params;
  let sql = `SELECT * FROM tokens WHERE token = "${token}"`;
console.log(sql);
  try {             
    let results = await db(sql);
  
    if (results.data.length === 0) {
      res.status(404).send({ error: 'Token not found' });
    }
    let tokenData = results.data[0];
    if (!tokenData.valid){
      res.status(401).send({ error: 'Token is not valid' });
    }
    res.send(tokenData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post('/', async (req, res, next) => {
  let {token} = req.body;
  let sql = `INSERT INTO tokens (token, valid) VALUES ("${token}",${1})`;
  
  try {
    await db(sql)

    res.status(201);
    res.send({token: token, valid: 1});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
