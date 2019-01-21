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

let checkoilPrice = () => {
    soap.createClient(url, function(err, client) {
        
        
        client.GetOilPrice(args, function(err, result) {
            let MyStr = JSON.stringify(result)
            let resultStr = ''
            const $ = cheerio.load(MyStr);
            $('DataAccess').each((i, el) => {
                
            
                //check member in children element
                const nChildren = $(el).children().length;
                const children = $(el).children();
                if(nChildren == 3) {
                    if(resultStr.trim() == '') {
                        resultStr = $(children[1]).text()+ "\n--> " + $(children[2]).text()
                    } else {
                        resultStr = resultStr + "\n" + $(children[1]).text()+ "\n--> " + $(children[2]).text()
                    }
                    resultStr = resultStr + "\n**********"
                    

                    console.log($(children[1]).text()+ " - " + $(children[2]).text())
                    console.log('*********')
                    //console.log($(children[2]).text())
                    //const item = $(el).text()
                    
                }
            })
            return resultStr
           
        });
    });
}

let handleText = (text) => {
    let ms;
    if(text == 'oil-now') {
        ms = checkoilPrice()
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