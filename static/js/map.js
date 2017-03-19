var directions = []

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var start = document.getElementById('start-location');
  var destination = document.getElementById('end-location');
  var startCoordinates, destinationCoordinates

  var autocomplete = new google.maps.places.Autocomplete(start);
  var autocomplete2 = new google.maps.places.Autocomplete(destination);

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 13,
    streetViewControl: false,
    zoomControl: true
  });
  directionsDisplay.setMap(map);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace()
    startCoordinates = [place.geometry.location.lat(), place.geometry.location.lng()]

    if (destinationCoordinates && startCoordinates) {
      calculateAndDisplayRoute(directionsService, directionsDisplay, startCoordinates, destinationCoordinates, map);
    }
  });

  autocomplete2.addListener('place_changed', function () {
    var place = autocomplete2.getPlace()
    destinationCoordinates = [place.geometry.location.lat(), place.geometry.location.lng()]

    if (destinationCoordinates && startCoordinates) {
      calculateAndDisplayRoute(directionsService, directionsDisplay, startCoordinates, destinationCoordinates, map);
    }
  })
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, start, destination, map) {
  directionsDisplay.setDirections({routes: []});
  directionsDisplay.setMap(null);

  if (directions && directions.length > 0) {
    for (var i = 0; i < directions.length; i++)
      directions[i].setMap(null);
  }
  directions = [];

  var selectedMode = "WALKING";
  directionsService.route({
    origin: {lat: start[0], lng: start[1]},  // 875 Howard Street
    destination: {lat: destination[0], lng: destination[1]},  // 714 Montgomery St
    travelMode: google.maps.TravelMode[selectedMode],
    provideRouteAlternatives: true
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      $(".route").remove();

      for (var i = 0, len = response.routes.length; i < len; i++) {
        var route = response.routes[i];

        var routeElement = $(".route-template:first").clone();
        $("#routes").append(routeElement);
        routeElement.find(".route-summary").text("Route " + (i + 1) + ": " + route.summary);
        routeElement.find(".distance").text(route.legs[0].distance.text);
        routeElement.find(".duration").text(route.legs[0].duration.text);
        routeElement.removeClass("route-template").addClass("route");
        routeElement.show();

        directions.push(new google.maps.DirectionsRenderer({
          map: map,
          directions: response,
          routeIndex: i,
          polylineOptions: {
            strokeColor: "red"
          }
        }))
      }
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
