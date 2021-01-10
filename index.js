/**
 * Back end for Local Business App
 * built for nwHacks 2021
 */

 //dependencies
 const express = require('express');
 const fetch = require('node-fetch');
 const helmet = require('helmet'); //security for the API
 const bodyParser = require('body-parser');
 const unirest = require("unirest") ;

//express object
const app = express();

//port automatically defaults to 4001 if not rendered by process environment
const port = process.env.PORT || 4001;


//http requests
//GETS to front page
app.get('/', (req, res) => {
    // res.send('server working!');
    const apiCall = unirest(

        "GET",
     
        "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
     
      );
    //   apiCall.query({
    //     "ip": "yourIP address"
    //     });
     
      apiCall.headers({
     
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
     
        "x-rapidapi-key": "b5871293aamsh822f2e9c47063aep14f351jsn4da519d69c4a"
     
      });
     
      apiCall.end(function(result) {
     
        if (res.error) throw new Error(result.error);
     
        console.log(result.body);
     
        res.send(result.body);
     
      });
    
});



//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});