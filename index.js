const express = require('express');
const app = express();

const line = require('@line/bot-sdk');
const soap = require('soap');
const cheerio = require('cheerio');

require('dotenv').config();


//config Token and Channel
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
    let textResult;
    if(text.toLowerCase() == 'oil') {
        textResult = check_oil_price()
    } else if (text.toLowerCase() == 'macbook') {
        textResult = 'อยากได้อยู่ T_T'
    } else {
        textResult = addPrefix(text)
    }

    return textResult;
}

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});


/**------ Function Handle value ------
 * 
 */

let check_oil_price = () => {
    const url = 'http://www.pttplc.com/webservice/pttinfo.asmx?WSDL';
    let args = {    
        'Language' : 'EN',
        'DD' : 30,
        'MM' : 12,
        'YYYY' : 2018
    }
    
    let strReturn = '';

    
    soap.createClient(url, (err, cli) => {     
       if(err == null) {
           return 'null'
       } else {
           return 'true'
       }
    })
    
}

let addPrefix = (text) => {
    let re = "Hi, " + text + " ^^";
    return re;
}

