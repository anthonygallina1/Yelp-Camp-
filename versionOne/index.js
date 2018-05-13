"use strict"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;
const dotenv = require("dotenv");
const helmet = require('helmet');
const frameguard = require('frameguard');
const session = require( 'express-session' ) ;
app.use(helmet());
app.disable('x-powered-by');
app.use(frameguard({ action: 'deny' }));
app.use(bodyParser.urlencoded({extended: true}));

app.use( session( {
  secret: 'AreallyLong-6^#FhF(53NGGFcasBA-secret-key-goes-HERE4NOw',
  key: 'sessionid',
  saveUninitialized: false,
  resave: false
} ) ) ;

// dotenv testing
const { error } = dotenv.config();
if (error) {
  throw error
};

// Template engine set up
app.set("view engine", "ejs");

//use middle ware to serve dist

app.use(express.static("dist/css"));

let campgrounds = [
  {name: "Alps Campground", image: "https://s26.postimg.cc/iad4b6qh5/CCOlic_Sagui_Andrea.jpg"},
  {name: "Granite Hill", image: "https://s26.postimg.cc/dbplwmzix/CCOlic_Jens_Mahnke.jpg"},
  {name: "Orange Campground", image: "https://s26.postimg.cc/5iyy4o19l/CCOlic_Miro_Alt.jpg"}
]

//Get and render images in campgrounds page
 app.get("/campgrounds", (req, res) => {
 res.render("campgrounds", {campgrounds: campgrounds});
 });

//redirect back to campgrounds view
 app.post("/campgrounds", (req, res) => {
   // get data from form and add to campgrounds array
   //res.send("YOU HIT THE POST ROUTE")
   let name = req.body.name;
   let image = req.body.image;
   const newCampground = {name: name, image: image}
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
 });

 app.get("/campgrounds/new", (req, res) => {
   res.render("new.ejs");
 })

 app.get('/', (req, res) => {
     res.render("landing");
 });

//Get and send page not found
app.get('*', (req, res) => {
    res.send('<h1>404 page not found</h1>');
});

//Setup port
app.listen(port, () => {
    console.log(`Yelp Camp Server is running on port ${port}.`);
});