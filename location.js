// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(displayLocationInfo);

//         function displayLocationInfo(position) {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         getCurrentAddress(lat, lng);
//         console.log(`longitude: ${ lng } | latitude: ${ lat }`);
//         }
//         async function getCurrentAddress(lat, lng){
//             const locationAPIKey = process.env.LOCATION_API_KEY;
//             var datas;
//             const locationURL = `http://api.positionstack.com/v1/reverse?access_key=${locationAPIKey}&query=${lat},${lng}&limit=10&output=json`;
//             const locationResponse = await fetch(locationURL).catch(e => { console.log(e) });
//             const openlocationData = await locationResponse.json().catch(e => { console.log(e) });
//             for(datas = 0; datas < 10; datas++){
//                 console.log(openlocationData.data[datas].name, openlocationData.data[datas].country);
//             }
//             const locationData = {
//                 location: openlocationData,
//             }
//             console.log(locationData);
//         }
        
// }