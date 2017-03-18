const geolib = require('geolib');

function convertToObject(coord) {
  return {
    latitude: coord[0],
    longitude: coord[1]
  };
}

// Get rectangle given a list of coordinates
module.exports = function getRectangle(coordinates) {
  const geolibCoordinates = coordinates.map(convertToObject);
  const geolibBounds = geolib.getBounds(geolibCoordinates);
  return geolibBounds;
}