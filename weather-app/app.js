const request = require("postman-request");

const url =
  "http://api.weatherstack.com/current?access_key=22747a15911047b75c8947fd0bafb4f0&query=26.802799,79.507103&units=m";
request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to the weather service.");
  } else if (response.body.error) {
    console.log("Unable to find location.");
  } else {
    console.log(
      response.body.current.weather_descriptions[0] +
        ". It's currently " +
        response.body.current.temperature +
        " degrees out. It feels like " +
        response.body.current.feelslike +
        " degrees out."
    );
  }
});
const geocodeURL =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/2%20Lincoln%20Memorial%20Cir%20NW.json?access_token=pk.eyJ1IjoiYW1pdDA3ODYiLCJhIjoiY2t3aXMwMnZyMDJrYTJvcGRnMmU3NzVqNSJ9.v8OJkgSbGZoy1rVOYq5VpA&limit=1";
request({ url: geocodeURL, json: true }, (error, response) => {
  if (error) {
    console.log("Unable to connect to location services..");
  } else if (response.body.features.length === 0) {
    console.log("Unable to find location try Another search..");
  } else {

    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];
    console.log(latitude, longitude);
  }
});
