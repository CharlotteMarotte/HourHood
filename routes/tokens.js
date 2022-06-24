var express = require('express');
var router = express.Router();
const db = require("../model/helper");


// * Get token
router.get('/:token', async function (req, res, next) {
  let { token } = req.params;
  let sql = `SELECT * FROM tokens WHERE token = "${token}"`;
console.log(sql);
  try {             
    let results = await db(sql);
  
    if (results.data.length === 0) {
      res.status(404).send({ error: 'Token not found' });
      return;
    }
    let tokenData = results.data[0];
    if (!tokenData.valid){
      res.status(401).send({ error: 'Token is not valid' });
      return;
    }
    res.send(tokenData);
    
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// * POST toke
router.post('/', async (req, res, next) => {

  let {token, valid} = req.body;
  let sql = `INSERT INTO tokens (token, valid) VALUES ("${token}",${valid})`;
  
  try {
    await db(sql)

    res.status(201);
    res.send({token: token, valid: valid});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.put('/:token', async (req, res, next) => {
  let { token } = req.params;
  let {valid} = req.body;
  
  let sql = `
              UPDATE tokens 
              SET token = "${token}", valid = ${valid}
              WHERE token = "${token}"
          `;
          console.log(sql)
  try {
    await db(sql)

    res.status(201);
    res.send({token: token, valid: valid});
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
