/* ========== Config server module ==========
    require express
*/
const express = require('express');
const app = express();


/* ========== Config line module ==========
    require line sdk and declare new object
*/
const line = require('@line/bot-sdk');
// set Token and Channel
const config = {
    channelAccessToken: 'gSUsaZB4IUt6h1TBQeZh8FPmR+/C3OVNcRNbC1JsVDj2OC6r7xUBqp6E9iG1HHtwWENJVsA80TJMt+/EPScTaosUOYFKCwCkxw1xb8BWdq4tYTb7MZHos+d1b/aBjDPeZLjKRb1O3jKMvFKekofjvgdB04t89/1O/w1cDnyilFU=',
    channelSecret: '154e9bed54c5d0d70335e563d2089062'
};
const client = new line.Client(config);


/* ========== Config soap and XML manage module ==========
    require soap
*/
const soap = require('soap');
const cheerio = require('cheerio')
require('dotenv').config();


/* ========== set webhook ==========
    Set 
*/
let p = 'price';


app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => console.log(result))
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
        textResult = p
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
let checkoilPrice = () => {

    //function in function
    let args = {    
        'Language' : 'EN',
        'DD' : 30,
        'MM' : 12,
        'YYYY' : 2018
    }
    const url = 'http://www.pttplc.com/webservice/pttinfo.asmx?WSDL';
    
    //soap.createClient(url, function(err, clients) {
        //console.log(clients)
        
        let resultStr = 'Blue Gasoline 95 \n--> 33.16 \n**********\n Blue Diesel \n--> 24.79\n **********\n'
        
        //clients.GetOilPrice(args, function(err, result) {
        //    
        //    let MyStr = JSON.stringify(result)
        //    let resultStr = ''
        //    const $ = cheerio.load(MyStr);
        //    $('DataAccess').each((i, el) => {
        //    
        //        //check member in children element
        //        const nChildren = $(el).children().length;
        //        const children = $(el).children();
        //        if(nChildren == 3) {
        //            if(resultStr.trim() == '') {
        //                resultStr = $(children[1]).text()+ "\n--> " + $(children[2]).text()
        //            } else {
        //                resultStr = resultStr + "\n" + $(children[1]).text()+ "\n--> " + $(children[2]).text()
        //            }
        //            resultStr = resultStr + "\n**********"
        //    
        //            console.log($(children[1]).text()+ " - " + $(children[2]).text())
        //            console.log('*********')
        //        }
        //    })
        //});
        return resultStr
    //});
    
}

let addPrefix = (text) => {
    let re = "Hi, " + text + " ^^";
    return re;
}

