const axios = require("axios");
const API_URL = 'http://api.weatherstack.com/current';

const city = process.argv[2];
// console.log("CityName ", city);

function getWeatherData(lat, long, callback) {
    axios.get(API_URL, {
        params: {
            access_key: 'c8afb34cb6433a188d2561b991166c84',
            query: lat + "," + long //'18.521428,73.8544541'
        }
    }).then(function ({ data = {} }) {
        if (data.error) {
            console.log("Unable to connect to weather service.")
            callback({
                error: "Unable to connect to weather service."
            })
        } else {
            // console.log(data.current);
            // console.log(data)
            let location = data.location.name + " " + data.location.region + " " + data.location.country
            let forecast = "Currently temperature is " + data.current.temperature + " but it feels like " + data.current.feelslike
            
            // console.log(response);
            callback({
                location,
                forecast
            })
        }
    }).catch(function (error) {
        // console.log(error);
        console.log("Unable to connect to weather service.")
        callback({
            error: "Unable to connect to weather service."
        })
    })
}

function getGeaocode (city, callback) {
    console.log("Getting geocode for city " + city)
    axios.get("https://api.geoapify.com/v1/geocode/search", {
        params: {
            text: city,
            lang: "en",
            limit: 1,
            type: "city",
            format: "json",
            apiKey: "d548c5ed24604be6a9dd0d989631f783",
        }
    }).then(({ data = {} }) => { // Object shorthand syntax is used here.
        if (data.results.length > 0) {
            // console.log(data)
            let latitude = data.results[0].lat;
            let longitude = data.results[0].lon;
            console.log(latitude, longitude);
            getWeatherData(latitude, longitude, callback);
        } else {
            console.log("No data found for provided city name.")
            callback({
                error: "No data found for provided city name."
            })
        }
    }).catch((error) => {
        console.log(error);
        console.log("Unable to connect to geaocode service.");
        callback({
            error: "Unable to connect to geaocode service."
        })
    });
}

module.exports = {
    getForecast: getGeaocode
}