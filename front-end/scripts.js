//Get user location
let lat, lon;
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
        let lat, lon;
        try {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const localPosition = {
                latitude: lat,
                longitude: lon
            };
            
            // //get weather
            // const weatherAPIURL = `/weather/${lat},${lon}`;
            // const weatherResponse = await fetch(weatherAPIURL);
            


        } catch (e) {
            console.error(e);
        }

        const data = {lat, lon}
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        
    });
} else {
    console.log('geolocation not available');
}