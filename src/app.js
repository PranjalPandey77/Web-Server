const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geoCode = require("./utils/geoCode");
//const App = require("./../Public/js/app");

const app = express();

//console.log(__dirname)

const indPath = path.join(__dirname, "../Public");
const viewPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(indPath));

app.get('', (req, res) => {
    //res.send("Hello Express.\nMyself Pranjal Pandey.\n");
    res.render("index",{
        title: "Dynamic Weather",
        Name: "Pranjal"
    });
});

app.get("/help", (req, res) => {
    // res.send([{
    //     name: "Pranjal Pandey",
    //     age: 27
    // },{
    //     name: "Nilotpal Sarkar",
    //     age: 29
    // }]);
    res.render("help",{
        title: "Welcome to Pranjal Pandey Help Page",
        link: "www.google.com",
        Name: "Pranjal Pandey"
    });
});

app.get("/about", (req, res) => {
    //res.send("<h1>Merry Christmas.</h1>");
    //res.send("hgcvkjn")
    res.render("about",{
        title: "About Pranjal Pandey",
        Name: "This is the Pic of Wonderful Place In This World"
    });
});

app.get("/weather", (req, res) => {
    // res.send(["<h1>Welcome to weather forecast.</h1><br>",{
    //     Place: "Varanasi",
    //     Lattitude: 45.567,
    //     Longitude: 123.45,
    //     Forecast: "Today being merry christmas eve, everything is awesome"
    // }]);
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address to get the weather"
        });
    }
    /*res.render("weather",{
        title: "Weather Forecast",
        Name: "Cyclone HudHud approaching"
    });*/

    location = req.query.address;
    //report = undefined;
    //Err = undefined;
    Lattitude = undefined;
    Longitude = undefined;

    geoCode(req.query.address, (error, response) => {
        if(error) {
            return res.send(error);
        }
        else
        if(response) {
            //console.log(response);
            //console.log("Now weather report of the given Place is : ");
            Lattitude = response.Lattitude;
            Longitude = response.Longitude;
            forecast(Lattitude, Longitude, (error, response) => {
                if(error) {
                    // console.log(error);
                    // Err = error;
                    // res.send({
                    //     Error: error
                    // });
                    return res.send(error);
                }
                else {
                    //console.log(response);
                    //report = response;
                    // res.send({
                    //     Place: location,
                    //     Lattitude: Lattitude,
                    //     Longitude: Longitude,
                    //     Forecast: response
                    // });
                    res.send([req.query.address, response]);
                }
            });
        }
    });
    // if(report) {
        
    // }
    // else {
        
    // }
});

app.get("/products", (req,res) => {
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get("/help/*", (req, res) => {
    //res.send("Help article not found");
    res.render("404",{
        error: "Help Page Not Found",
        Name: "Pranjal Pandey",
        title: "Help article Not found"
    });
});

app.get("*", (req, res) => {
   // res.send("404 error.Page Not Found");
   res.render("404",{
       error: "Entered URL not found.",
       Name: "Pranjal Pandey",
       title: "URL 404 error"
   });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});