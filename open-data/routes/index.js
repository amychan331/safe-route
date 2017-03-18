var express = require('express');
var router = express.Router();
const request = require('request');

const getRectangle = require('../lib/get-rectangle');

const x = "-122.417488323639";
const y = "37.7651818039906";
const category = "VEHICLE THEFT";
const openDataCall = (option) => {
  const maxX = option.maxLat;
  const minX = option.minLat;
  const maxY = options.maxLng;
  const minY = options.minLng;
  new Promise((resolve, reject) => {
    request({
      url: `https://data.sfgov.org/resource/cuks-n6tp.json?x=${x}&y=${y}&category=${category}`,
      method: 'GET'
    }, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};


/* GET home page. */
router.get('/', function(req, res, next) {
  // Start and end of the route in google coordinates
  const routeCoordinates = [[37.7818248, -122.4039391], [37.79589279999999, -122.40316029999997]];

  // Convert to coordinates in geolib, and get the rectangular bounds
  const rectLimits = getRectangle(routeCoordinates);

  // Get open data list of crimes within the rectangle
  openDataCall(rectLimits).then((data) => {
    res.status(200).send(data);
  });
});

module.exports = router;
