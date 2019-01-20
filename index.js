const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();
/*
const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret || 154e9bed54c5d0d70335e563d2089062

};
*/
const config = {
    channelAccessToken: 'gSUsaZB4IUt6h1TBQeZh8FPmR+/C3OVNcRNbC1JsVDj2OC6r7xUBqp6E9iG1HHtwWENJVsA80TJMt+/EPScTaosUOYFKCwCkxw1xb8BWdq4tYTb7MZHos+d1b/aBjDPeZLjKRb1O3jKMvFKekofjvgdB04t89/1O/w1cDnyilFU=',
    channelSecret: '154e9bed54c5d0d70335e563d2089062'

};

const client = new line.Client(config);

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

//app.use('/hello', hello);

let hello = (req, res, next)=> {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
}

function handleEvent(event) {

    console.log(event);
    if (event.type === 'message' && event.message.type === 'text') {
        handleMessageEvent(event);
    } else {
        return Promise.resolve(null);
    }
}

function handleMessageEvent(event) {
    var msg = {
        type: 'text',
        text: 'Hello , This Subalgo BOT'
    };

    return client.replyMessage(event.replyToken, msg);
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});