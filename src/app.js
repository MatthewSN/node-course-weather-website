const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("../utils/geoCode");
const forecast = require("../utils/forecast");

const app = express();

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view loacaction
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Matthew Simon"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Anout",
    name: "Matthew Simon"
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "some info to help you",
    title: "Help",
    name: "Matthew Simon"
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.send({
      error: "Address must be provided"
    });
  }
  geoCode(address, (error, { location, latitude, longitude } = {}) => {
    if (error) {
      return res.send({
        error
      });
    }
    console.log(location);
    forecast(latitude, longitude, (error, { forecast }) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast,
        location,
        address: req.query.address
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term"
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Error", {
    title: "404",
    message: "Help article not found",
    name: "Matthew Simon"
  });
});

app.get("*", (req, res) => {
  res.render("404Error", {
    title: "404",
    message: "My 404 page",
    name: "Matthew Simon"
  });
});

app.listen("3000", () => {
  console.log("Server is up on port 3000");
});
