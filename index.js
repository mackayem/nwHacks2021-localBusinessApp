/**
<<<<<<< HEAD
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

const app = express();
app.use(express.static('front-end'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.raw());

//port automatically defaults to 4001 if not rendered by process environment
const port = process.env.PORT || 4001;

//helper function for places search queries

async function getPlaces(query, lat, lon, clientID, clientSecret, versionDate) {
    const URL = `https://api.foursquare.com/v2/venues/search?client_id=${clientID}&v=${versionDate}&ll=${lat},${lon}&intent=browse&radius=10000&query=${query}&limit=10&client_secret=${clientSecret}`;
    const response = await fetch(URL).catch(e => { console.log(e) });
    const data = await response.json().catch(e => { console.log(e) });

    return data;
}


//user-submitted post request parses location data and returns list of activities based on weather conditions
app.post('/', async (req, res) => {
    //address lat/lon params
    let lat = req.body.lat;
    let lon = req.body.lon;

    //const date (for version param for FourSquare API)
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const versionDate = year + month + date;

    //FourSquare API information
    const fourSquareClientID = process.env.FOURSQUARE_PLACES_CLIENT_ID;
    const fourSquareClientSecret = process.env.FOURSQUARE_PLACES_CLIENT_SECRET;

    //weather data from openweathermap api
    const openWeatherAPIKEY = process.env.OPEN_WEATHER_MAP_API_KEY;
    const openWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherAPIKEY}`;
    const openWeatherResponse = await fetch(openWeatherURL).catch(e => { console.log(e) });
    const openWeatherData = await openWeatherResponse.json().catch(e => { console.log(e) });

    let isWeatherDecent = true;

    //all good weather codes are codes, 800-804. All else are 
    //inclement. use outdoor and indoor activities accordingly
    //TODO: figure out why this logic is failing
    if (openWeatherData.weather[0].id !== 800 &&
        openWeatherData.weather[0].id !== 801 &&
        openWeatherData.weather[0].id !== 802 &&
        openWeatherData.weather[0].id !== 803 &&
        openWeatherData.weather[0].id !== 804) {
            isWeatherDecent = false;
        }
    // //relevant weather data 
    const weatherData = {
        weatherCode: openWeatherData.weather[0].id,
        weatherConditions: openWeatherData.weather[0].main,
        isWeatherDecent: isWeatherDecent,
        locationName: openWeatherData.name
    };
    
    // //indoor activities, shopping, restaurants nearby (included both in bad weather and good)
    const coffee = await getPlaces("coffee", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const museums = await getPlaces("museum", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const galleries = await getPlaces("gallery", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const movieTheaters = await getPlaces("movie theater", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const shopping = await getPlaces("shopping", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const restauraunts = await getPlaces("restaurants", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const wineries = await getPlaces("winery", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const breweries = await getPlaces("brewery", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
    const salons = await getPlaces("salon", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });

    //Object of indoor activities
    const indoorActivities = {
        coffee: coffee,
        museums: museums,
        galleries: galleries,
        movieTheaters: movieTheaters,
        shopping: shopping,
        restaurants: restauraunts,
        wineries: wineries,
        breweries: breweries,
        salons: salons
    };

    if (isWeatherDecent) {
        //outdoor activities like amusement parks, parks, beaches, etc
        const beaches = await getPlaces("beach", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
        const parks = await getPlaces("park", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
        const hikingTrails = await getPlaces("trail", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });
        const amusementParks = await getPlaces("amusement park", lat, lon, fourSquareClientID, fourSquareClientSecret, versionDate).catch(e => { console.log(e) });

        const outdoorActivities = {
            beaches: beaches,
            parks: parks,
            hikingTrails: hikingTrails,
            amusementParks: amusementParks
        };

        const activities = {
            indoor: indoorActivities,
            outdoor: outdoorActivities,
            weatherInfo: weatherData
        };

        res.json(activities);

    } else {
        const activities = {
            indoor: indoorActivities, //rainy day activities
            weatherInfo: weatherData
        };
        res.json(activities);
    }
})

//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});