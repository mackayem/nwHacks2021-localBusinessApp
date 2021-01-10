/**
 * Back end for Local Business App
 * built for nwHacks 2021
 */

 //dependencies
 const express = require('express');
 const fetch = require('node-fetch');
 const helmet = require('helmet'); //security for the API
 const bodyParser = require('body-parser');
 const SerpApi = require('google-search-results-nodejs');

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
    //   res.json(weatherData);
        const search = new SerpApi.GoogleSearch("e69fe506428b4edb13612338fce04bd2f73c81257942630f017498de92a55dfb");

        const params = {
        engine: "google",
        q: "school",
        ll: "%4040.7455096%2C-74.0083012%2C15.1z",
        type: "search",
        google_domain: "google.com",
        num: "5"
        };

        const callback = function(data) {
        console.log(data['local_results']);
        };

        // Show result as JSON
        search.json(params, callback);
});



//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});