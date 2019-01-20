const express = require('express');
const line = require('@line/bot-sdk');

require('dotenv').config();

const app = express();

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
        text: handleText(event.message.text)
    };

    return client.replyMessage(event.replyToken, msg);
}

let handleText = (text) => {
    let ms;
    if(text == 'oil-now') {
        ms = 'เดี๋ยวเช็คราคาน้ำมันให้นะ'
    } else if (text == 'macbook') {
        ms = 'อยากได้อยู่ T_T'
    } else {
        ms = 'Hi, ' + text
    }

    return ms;
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});