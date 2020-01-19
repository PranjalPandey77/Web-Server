// use of call backs for making our weather app more robust

const request = require("request");

const geoCode = (Location,callback) => {
    const geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(Location) + ".json?access_token=pk.eyJ1IjoicHJhbmphbHBhbmRleSIsImEiOiJjazRjajd6aHkwNmE1M2xtcnRob3BubGVvIn0.OURNXp-sP3irFW1m0tfQpA";

    request({ url: geourl, json: true }, (error, response) => {
        if(error)
        {
            callback({
                error: "Unable to connect to Internet"
            },undefined);
        }
        else
        if(response.body.message)
        {
            callback({
                error: response.body.message
            }, undefined);
        }
        else
        if(response.body.features.length === 0)
        {
            callback({
                error: "Place Not Found"
            }, undefined);
        }
        else
        {
            callback(undefined, {
                Lattitude: response.body.features[0].center[1],
                Longitude: response.body.features[0].center[0],
                Location:  response.body.features[0].place_name
            });
        }
    });
}


module.exports = geoCode;