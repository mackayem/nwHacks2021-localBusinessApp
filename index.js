/**
 * Back end for Local Business App
 * built for nwHacks 2021
 */

 //dependencies
 const express = require('express');
 const fetch = require('node-fetch');
 const helmet = require('helmet'); //security for the API
 const bodyParser = require('body-parser');
 const serpApi = require('google-search-results-nodejs');


 //env vars
 require('dotenv').config();

 //express object
const app = express();
app.use(express.static('front-end'));
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

//port automatically defaults to 4001 if not rendered by process environment
const port = process.env.PORT || 4001;


//http requests
//GETS to front page

app.get('/', async (req, res) => {
    //geolocator
    //TODO: implement city locator
    // const city = request.params.city;
    
    //weather data
    const openWeatherAPIKEY = process.env.OPEN_WEATHER_MAP_API_KEY;
    const weatherMapUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${openWeatherAPIKEY}`;
    const openWeatherData = await openWeatherResponse.json().catch(e => { console.log(e) });
    //weather main data
    const weatherData = {
        weatherCode: openWeatherData.weather.id,
        weatherConditions: openWeatherData.weather.main
    };
    
    let isWeatherDecent = true;
    //all good weather codes are codes, 800-804. All else are 
    //inclement. use outdoor and indoor activities accordingly
    if (weatherData.weatherCode != 800 ||
        weatherData.weatherCode != 801 ||
        weatherData.weatherCode != 802 ||
        weatherData.weatherCode != 803 ||
        weatherData.weatherCode != 804) {
            isWeatherDecent = false;
        }

    //indoor activities, shopping, restaurants nearby (included both in bad weather and good)
    const coffee = serpAPIQuery(`coffee ${city}`);
    const bars = serpAPIQuery(`bar ${city}`);
    const museums = serpAPIQuery(`museums ${city}`);
    const galleries = serpAPIQuery(`gallery ${city}`);
    const movieTheaters = serpAPIQuery(`movie theaters ${city}`);
    const shopping = serpAPIQuery(`shopping ${city}`);
    const restauraunts = serpAPIQuery(`restaurants ${city}`);

    const indoorActivities = {
        coffee: coffee,
        bars: bars,
        museums: museums,
        galleries: galleries,
        movieTheaters: movieTheaters,
        shopping: shopping,
        restaurants: restauraunts
    };

    if (isWeatherDecent) {
        //outdoor activities like amusement parks, parks, beaches, etc
        const beaches = serpAPIQuery(`beach ${city}`);
        const parks = serpAPIQuery(`park ${city}`);
        const hikingTrails = serpAPIQuery(`hiking trails ${city}`);

        const outdoorActivities = {
            beaches: beaches,
            parks: parks,
            hikingTrails: hikingTrails
        };

        const activities = {
            indoor: indoorActivities,
            outdoor: outdoorActivities
        };
    } else {
        const activities = {
            indoor: indoorActivities //rainy day activities
        }
    }

    //return all available activities
    res.json(activities);

});

//this is a function to query the serpAPI from google for local businesses
function serpAPIQuery(q){
    const googleSearchAPIKey = process.env.GOOGLE_SEARCH_API_KEY;
    const search = new serpApi.GoogleSearch(`${googleSearchAPIKey}`);
    const params = {
        engine: 'google',
        q: q,
        type: 'search',
        google_domain: 'google.com',
        num: '5',
    };
    const callback = function(data) {
        console.log(data['local_results']);
        };

    // Show result as JSON
    const list = { result: search.json(params, callback), }

    return list;
}
//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});