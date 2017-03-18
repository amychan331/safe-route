var express = require('express');
var router = express.Router();
const request = require('request');

const x = "-122.417488323639";
const y = "37.7651818039906";
const category = "VEHICLE THEFT";

const openDataCall = new Promise((resolve, reject) => {
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

/* GET home page. */
router.get('/', function(req, res, next) {
  // TODO
  const routeCoordinates = req.body;
  console.log(routeCoordinates);

  // TODO put coordinates into a rectangle
  openDataCall.then((data) => {
    res.status(200).send(data);
  });
});

module.exports = router;
