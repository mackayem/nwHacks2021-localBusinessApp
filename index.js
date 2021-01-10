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
app.get('/weather', async (req, res) => {
      const openWeatherAPIKEY = process.env.OPEN_WEATHER_MAP_API_KEY;
      const lat = req.body.latitude;
      const lng = req.body.longitude;
      const weatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?q=vancouver&appid=${openWeatherAPIKEY}`;
      const openWeatherResponse = await fetch(weatherMapUrl).catch(e => { console.log(e) });
      const openWeatherData = await openWeatherResponse.json().catch(e => { console.log(e) });
      console.log(openWeatherData);
      const weatherData = {
          weather: openWeatherData,
      }
      res.send(weatherData);
    });
app.get('/listing', async (req, res) => {
        const openWeatherAPIKEY = process.env.GOOGLE_SEARCH_API_KEY;
        const search = new SerpApi.GoogleSearch(`${googleSearchAPI}`);
        const lat = req.body.latitude;
        const lng = req.body.longitude;
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
        const list = { result: search.json(params, callback), }
        res.send(list);
});
app.get('/address', async (req, res) => {
        const lat = req.body.latitude;
        const lng = req.body.longitude;
            const locationAPIKey = 'process.env.LOCATION_API_KEY';
            var datas;
            const locationURL = `http://api.positionstack.com/v1/reverse?access_key=${locationAPIKey}&query=${lat},${lng}&limit=10&output=json`;
            const locationResponse = await fetch(locationURL).catch(e => { console.log(e) });
            const openlocationData = await locationResponse.json().catch(e => { console.log(e) });
            for(datas = 0; datas < 10; datas++){
                console.log(openlocationData.data[datas].name, openlocationData.data[datas].country);
            }
            const locationData = {
                location: openlocationData,
            }
            console.log(locationData)
            res.send(locationData)

});

//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});