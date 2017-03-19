var express = require('express');
var router = express.Router();
const request = require('request');

const getRectangle = require('../lib/get-rectangle');

var fs = require('fs');
var obj;

const openDataCall = (coord1, coord2) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://data.sfgov.org/resource/cuks-n6tp.json?&$where=within_box(location, ${coord1[0]}, ${coord1[1]}, ${coord2[0]}, ${coord2[1]})`,
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

const openDataCallMock = (coord1, coord2) => {
  return new Promise((resolve, reject) => {
    fs.readFile(require('path').join(__dirname, '../../db/boxed.json'), 'utf8', function (err, data) {
      if (err) throw err;
      obj = JSON.parse(data);
      resolve(obj);
    });
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // Start and end of the route in google coordinates
  const routeCoordinates = [[37.7818248, -122.4039391], [37.79589279999999, -122.40316029999997]];

  // Convert to coordinates in geolib, and get the rectangular bounds
  // const rectLimits = getRectangle(routeCoordinates);

  // Get open data list of crimes within the rectangle
  openDataCallMock(routeCoordinates[0], routeCoordinates[1]).then((data) => {
    //console.log(data);
    let filtered_data;
    try {
      filtered_data = data.filter((incident) => {
          let differences = new Date().getTime() - new Date(incident.date).getTime();
          return Math.floor(differences / (1000 * 60 * 60 * 24 * 7 * 4)) < 6;
      });

      const filteredData = data.map((crime) => {
        return { coordinate: crime.location.coordinates,
        category: crime.category };
      });
      res.status(200).send(filteredData);
      return filtered_data;
    }
    catch(e) {
      return 'no data';
    }
  });
});

module.exports = router;
