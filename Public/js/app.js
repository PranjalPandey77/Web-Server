//const e = require("express");

console.log("Hi I am a javascript Developer");
/*
const url = "http://puzzle.mead.io/puzzle";

fetch(url).then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

// module.exports = fetch;
// "http://puzzle.mead.io/puzzle"*/






const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
mssg1 = document.querySelector("#message-1");
mssg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);
    const url = "http://localhost:3000/weather?address=" + location;
    mssg1.textContent = "Loading .............................................................................................................";
    mssg2.textContent = "";
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            mssg1.textContent = data.error;//JSON.stringify(data.error);//"From Pranjal Pandey Happy Diwali";
            console.log(data);
        } else {
            mssg1.textContent = data[0] + " weather report is as follows : ";
            mssg2.textContent = data[1].daily.data[1].summary + ' .It is currently ' + data[1].currently.temperature + " Degrees out . There is a " + data[1].currently.precipProbability + "% chance of Rain.";
            console.log(data);
           // console.log(data.erro);
        }
        //mssg1.textContent = data;
        //console.log(data);
    });
});
    //console.log("testing");
});