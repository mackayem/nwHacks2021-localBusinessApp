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
=======
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
>>>>>>> 1fb1b7b117d1cbc6df1bb7e11d068187c691c3b3

//port automatically defaults to 4001 if not rendered by process environment
const port = process.env.PORT || 4001;

<<<<<<< HEAD
//user-submitted post request parses information
app.post('/activities', async (req, res) => {
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
    if (openWeatherData.weather[0].id != 800 ||
        openWeatherData.weather[0].id != 801 ||
        openWeatherData.weather[0].id != 802 ||
        openWeatherData.weather[0].id != 803 ||
        openWeatherData.weather[0].id != 804) {
            isWeatherDecent = false;
        }
    
    // //relevant weather data 
    const weatherData = {
        weatherCode: openWeatherData.weather[0].id,
        weatherConditions: openWeatherData.weather[0].main,
        weatherisNice: isWeatherDecent,
        locationName: openWeatherData.name
    };

    res.json(weatherData);
 
    // //indoor activities, shopping, restaurants nearby (included both in bad weather and good)
    // const coffee = 
    // const bars = 
    // const museums = 
    // const galleries = 
    // const movieTheaters = 
    // const shopping = 
    // const restauraunts = 
    // const wineries = 
    //const breweries = 

//     if (isWeatherDecent) {
//         //outdoor activities like amusement parks, parks, beaches, etc
//         const beaches = 
//         const parks = 
//         const hikingTrails = 

//         const outdoorActivities = {
//             beaches: beaches,
//             parks: parks,
//             hikingTrails: hikingTrails
//         };

//         const activities = {
//             indoor: indoorActivities,
//             outdoor: outdoorActivities,
//             weatherInfo: weatherData
//         };
//     } else {
//         const activities = {
//             indoor: indoorActivities, //rainy day activities
//             weatherInfo: weatherData
//         }
//     }

//     //return all available activities
//     res.json(activities);
})


async function getPlaces(query, lat, lon, clientID, clientSecret, versionDate) {
    const URL = `https://api.foursquare.com/v2/venues/search?client_id=${clientID}&v=${versionDate}&ll=${lat},${lon}&intent=browse&radius=10000&query=${query}&limit=10&client_secret=${clientSecret}`;
    const response = await fetch(URL).catch(e => { console.log(e) });
    const data = await response.json().catch(e => { console.log(e) });

    return data;
}


app.get('/4square', async (req, res) => {
    //const date (for version param for FourSquare API)
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    const versionDate = year + month + date;

    let lat = 49;
    let lon = -123;

    const fourSquareClientID = process.env.FOURSQUARE_PLACES_CLIENT_ID;
    const fourSquareClientSecret = process.env.FOURSQUARE_PLACES_CLIENT_SECRET;
    const URL = `https://api.foursquare.com/v2/venues/search?client_id=${fourSquareClientID}&v=${versionDate}&ll=${lat},${lon}&intent=browse&radius=10000&query=coffee&limit=10&client_secret=${fourSquareClientSecret}`
    const placesQuery = await fetch(URL).catch(e => { console.log(e) });
    const placesData = await placesQuery.json().catch(e => { console.log(e) });
    res.send(placesData);
})

=======

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
>>>>>>> 1fb1b7b117d1cbc6df1bb7e11d068187c691c3b3
//app listening to port
app.listen(port, () => {
    console.log('Listening on port ' + port);
});