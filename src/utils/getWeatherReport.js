const request = require("request");

const getWeather = (Lattitude, Longitude, callback) => {
    const url = "https://api.darksky.net/forecast/db20113b3838f672f87995ca11ac6a33/" + Lattitude + "," + Longitude + "?units=si";

    request({url: url, json: true}, (error, response) => {
        if(error)
        {
            callback("Can't connect to weather API", undefined);
        }
        else
        if(response.body.code === 400)
        {
            callback(response, undefined);
        }
        else
        {
            const data = (response.body);
            response = data.daily.data[0].summary + ' .It is currently ' + data.currently.temperature + " Degrees out . There is a " + data.currently.precipProbability + "% chance of Rain.";
            callback(undefined, response);
        }
    });
}

module.exports = getWeather;