const express = require('express');
const soap = require('soap');
const url = 'http://www.pttplc.com/webservice/pttinfo.asmx?WSDL';
const parseString = require('xml2js').parseString;
const cheerio = require('cheerio')
const request = require('request')

require('dotenv').config();

const app = express();

//const $ = cheerio.load("{ GetOilPriceResult: '<PTT_DS>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Gasoline 95</PRODUCT>\r\n    <PRICE>33.16</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2015-06-05T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Gasoline 91</PRODUCT>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Diesel</PRODUCT>\r\n    <PRICE>24.79</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Gasohol 91</PRODUCT>\r\n    <PRICE>25.48</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Gasohol E20</PRODUCT>\r\n    <PRICE>22.74</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-16T00:01:00+07:00</PRICE_DATE>\r\n    <PRODUCT>NGV</PRODUCT>\r\n    <PRICE>16.06</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Gasohol 95</PRODUCT>\r\n    <PRICE>25.75</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2009-10-01T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>DIESEL PALM</PRODUCT>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2011-03-01T06:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Diesel B5</PRODUCT>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-25T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>Blue Gasohol E85</PRODUCT>\r\n    <PRICE>18.94</PRICE>\r\n  </DataAccess>\r\n  <DataAccess>\r\n    <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n    <PRODUCT>HyForce Premium Diesel</PRODUCT>\r\n    <PRICE>28.39</PRICE>\r\n  </DataAccess>\r\n</PTT_DS>' }")
const $ = cheerio.load("{ GetOilPriceResult: '<PTT_DS>\r\n  <DataAccess>\r\n  <PRICE_DATE>2018-12-27T05:00:00+07:00</PRICE_DATE>\r\n       <PRODUCT>Blue Gasoline 95</PRODUCT>\r\n    <PRICE>33.16</PRICE>\r\n  </DataAccess>\r\n  </PTT_DS>' }")

//print product list
const pList = {}
$('DataAccess').each((i, el) => {
    //const item = $(el).text()
    //console.log($(el).children())

    //check member in children element
    const nChildren = $(el).children().length;
    const children = $(el).children();
    if(nChildren == 3) {
        console.log($(children[1]).text()+ " - " + $(children[2]).text())
        console.log('*********')
        console.log($(children[2]).text())
        const item = $(el).text()
        //console.log(item)
    }
    const item = $(el).length
    
})

console.log('**********************')

$('PRICE').each((i, el) => {
    const item = $(el).text()
    //console.log(item)
})


let args = {    
                'Language' : 'EN',
                'DD' : 30,
                'MM' : 12,
                'YYYY' : 2018
            }


let hello = (req, res)=> {
    res.setHeader('Content-Type', 'text/plain');
    //res.setHeader('Content-Type', 'text/html');
    soap.createClient(url, function(err, client) {
        
        
        client.GetOilPrice(args, function(err, result) {
            var xml = "<root>Hello 333</root> <root>erer</root>"

            parseString(xml, function (err, res1) {
                let MyStr = JSON.stringify(result)
                
                console.log(result);
                res.end('' + MyStr)
            });
            

            
        });
    });
   
}

app.get('/', hello)


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('run at port', app.get('port'));
});