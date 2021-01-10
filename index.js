/**
 * Back end for Local Business App
 * built for nwHacks 2021
 */

 //dependencies
 const express = require('express');
 const fetch = require('node-fetch');
 const helmet = require('helmet'); //security for the API
 const bodyParser = require('body-parser');

//express object
const app = express();

//port automatically defaults to 4001 if not rendered by process environment
const port = process.env.PORT || 4001;


//http requests
//GETS to front page
app.get('/', (req, res) => {
    res.send('server working!');
});



//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});