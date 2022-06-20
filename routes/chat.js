var express = require('express');
var router = express.Router();
const db = require('../model/helper');
require('dotenv').config();
const Pusher = require('pusher');

const GET_MESSAGE_COUNT = 5;

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

router.post('/:senderId/:receiverId', async function(req, res) { 
let { senderId, receiverId } = req.params; 
let { text, socketId } = req.body;
let ids = [senderId, receiverId].sort();

let channelName= 'channel-' + ids.join('-');

let newMsg = { senderId, receiverId, text };

channel.trigger(channelName, 'message', newMsg, {socket_id: socketId });
res.send(newMsg);
});

module.exports = router;
