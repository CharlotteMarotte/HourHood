var express = require('express');
var router = express.Router();
const db = require('../model/helper');
require('dotenv').config();
const Pusher = require('pusher');

const GET_MESSAGE_COUNT = 25;

/*const channel = new Pusher({ 
    appId: process.env.PUSHER_APP_ID, 
    key: process.env.PUSHER_KEY, 
    secret: process.env.PUSHER_SECRET, 
    cluster: 'eu', 
    useTLS: true
});*/

const channel = new Pusher({ 
    appId: "1425738",
    key: "743d776d890cdc65b073",
    secret: "8a6f5cc718f715618fca",
    cluster: "eu",
    useTLS: true
});

router.get('/:bookingId', async function(req, res) {
    let { bookingId } = req.params;
    try {
        let sql = `
            SELECT * FROM messages
            WHERE fk_booking_id = ${bookingId}
            ORDER BY dateTime DESC
            LIMIT ${GET_MESSAGE_COUNT}
            `;
        let results = await db(sql);
        res.send( results.data.reverse());
    } catch (err) {
        res.status(500).send({erro: `Error from router.get`});
    }
});

router.post('/:bookingId', async function(req, res) { 
    let { bookingId } = req.params; 
    let { text, senderName, socketId } = req.body;

    let text4db = text.replace(/\'/g, "\\'");
    let newMsg = null;
        try{
            let sql = `
                INSERT INTO messages (senderName, text, fk_booking_id)
                VALUES ('${senderName}', '${text4db}', ${bookingId});
                SELECT LAST_INSERT_ID()
                `;
            let results = await db(sql);
            let newMsgId = results.data[0].insertId;
            results = await db (`SELECT * FROM messages WHERE id = ${newMsgId}`);
            newMsg = results.data[0];
        } catch (err) {
            // res.status(500).send({error: err.message})
            res.status(500).send({error: `Router.post is not working`});
            return;
        }


    
    let channelName= 'channel-' + bookingId;

    // let newMsg = { senderId, receiverId, text };

    channel.trigger(channelName, 'message', newMsg, {socket_id: socketId });
    res.send(newMsg);
    });

module.exports = router;
