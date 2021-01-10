/**
 * Back end for Local Business App
 * built for nwHacks 2021
 */

 //dependencies
 const express = require('express');
 const fetch = require('node-fetch');
 const helmet = require('helmet'); //security for the API
 const bodyParser = require('body-parser');

 //env vars
 require('dotenv').config();

 //express object
const app = express();

//port automatically defaults to 4001 if not rendered by process environment
const port = process.env.PORT || 4001;


//http requests
//GETS to front page
app.get('/', async (req, res) => {
      const openWeatherAPIKEY = process.env.OPEN_WEATHER_MAP_API_KEY;
      const weatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?q=vancouver&appid=${openWeatherAPIKEY}`;
      const openWeatherResponse = await fetch(weatherMapUrl).catch(e => { console.log(e) });
      const openWeatherData = await openWeatherResponse.json().catch(e => { console.log(e) });
      console.log(openWeatherData);
      const weatherData = {
          weather: openWeatherData,
      }
      res.json(weatherData);
});



//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});