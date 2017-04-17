// My Neighbourhood map that will be displayed on the page
var map;
// Infowindow, needed when a marker is selected on the map
var infowindow;

// My locations in my neighbourhood map, containing title, latitude,
// and longitude for google api position.  Also FourSquare Venue Id
var locations = [
  {
    title: 'Ohlone College',
    lat: 37.5300423,
    lng: -121.9150642,
    fsVenueId: '4a73f442f964a520a1dd1fe3'
  },
  {
    title: 'Tesla',
    lat: 37.4935111,
    lng: -121.9422263,
    fsVenueId: '4bf713ee13aed13a7ec6eaf7'
  },
  {
    title: 'Mission Peak Preserve',
    lat: 37.5053082,
    lng: -121.8768889,
    fsVenueId: '49eb6454f964a520d4661fe3'
  },
  {
    title: 'Central Park',
    lat: 37.5477609,
    lng: -121.9654383,
    fsVenueId: '4ade0492f964a520696721e3'
  },
  {
    title: 'Bart',
    lat: 37.5021745,
    lng: -121.939316,
    fsVenueId: '50a66dcfe4b0b5b54c2d813e'
  },
  {
    title: 'Frys Electronics',
    lat: 37.515678,
    lng: -121.942508,
    fsVenueId: '49ee8972f964a5206b681fe3'
  },
  {
    title: 'Walmart',
    lat: 37.5113,
    lng: -121.943,
    fsVenueId: '48506200f964a52099501fe3'
  },
  {
    title: 'NewPark Mall',
    lat: 37.526336,
    lng: -122.000631,
    fsVenueId: '4b4a6dcff964a5204d8726e3'
  }
];


// Location Model
var Location = function(locationItem) {
  var self = this;

  // Get Location Title
  self.title = ko.observable(locationItem.title);

  // Get Location Latitute and Longitude
  self.lat = locationItem.lat;
  self.lng = locationItem.lng;

  // Get FourSquare Venue ID for the location
  self.fsVenueId = locationItem.fsVenueId;

  // Create a Location marker with the title, latitude and
  // longitude on the map
  self.marker = new google.maps.Marker({
    position: new google.maps.LatLng(self.lat, self.lng),
    title: self.title(),
    map: map,
    animation: google.maps.Animation.DROP
  });

  // Function to perform when the marker on map is clicked
  self.markerClicked = function () {
    // Get marker position on map
    map.panTo(self.marker.getPosition());

    // Prepare marker's infowindow to show with content
    infowindow.setContent(self.markerContent);
    // Open the marker's infowindow
    infowindow.open(map, self.marker);

    // Set Animation Bounce when the marker is clicked
    self.marker.setAnimation(google.maps.Animation.BOUNCE);
    // Set timeout for animation
    setTimeout(function () {
      self.marker.setAnimation(null);
    }, 700);

  };

  // Add Listener to marker, when clicked perform a function
  self.marker.addListener('click', self.markerClicked);

  // Boolean to display location's title in list and marker on map
  self.display = ko.observable(true);
  self.display.subscribe(function (displayBoolean) {
    self.marker.setVisible(displayBoolean);
  });

  // Content for marker's infowindow
  self.markerContent = '';
  // Function to get location data from FourSquare API
  // to display on infowindow
  (function () {
    // Preparing FourSquare URL with Client_ID and Client_Secret key
    var FS_CLIENT_ID = '2QBUSUF2YQ32ZIHSVRCYDLFGTN5M4PEJ5TFTWVM400RKL4EW';
    var FS_CLIENT_SECRET = '0QQ5YFYE5TAFUDDMAGGLO5LIOYMBY4UZJENNMZHTEFOJJZEX';
    var FS_URL = 'https://api.foursquare.com/v2/venues/' + self.fsVenueId +
                  '?client_id=' + FS_CLIENT_ID + '&client_secret=' +
                  FS_CLIENT_SECRET + '&v=20170406&m=foursquare';
    $.getJSON(FS_URL)
      .done(function (data) {
        // Get Venue data and store to display on infowindow
        locVenueInfo = data.response.venue;
        // Get data one by one and display message if cannot get data
        var photoPrefix = locVenueInfo.bestPhoto.prefix ?
                          locVenueInfo.bestPhoto.prefix :
                          'No Prefix Photo';
        var photoSuffix = locVenueInfo.bestPhoto.suffix ?
                          locVenueInfo.bestPhoto.suffix :
                          'No Suffix Photo';
        var address1 = locVenueInfo.location.formattedAddress[0] ?
                       locVenueInfo.location.formattedAddress[0] :
                       'No Address1';
        var address2 = locVenueInfo.location.formattedAddress[1] ?
                       locVenueInfo.location.formattedAddress[1] :
                       'No Address2';
        var description = locVenueInfo.description ?
                          locVenueInfo.description :
                          'No Description';

        // Marker Content for infowindow, for html view
        self.markerContent = '<div id="infowindow" class="iw-content">' +
                                '<h4>' + self.title() + '</h4>' +
                                '<dl>' +
                                '<dt>Location data from FourSquare:</dt>' +
                                '<dd>' + '<img src="' + photoPrefix +
                                  '200x150' + photoSuffix +
                                  '" alt="Location Photo">' + '</dd>' +
                                '<br>' +
                                '<dt>Address</dt>' +
                                '<dd>' + '<p>' + address1 + ', ' +
                                  address2 + '</p>' + '</dd>' +
                                '<dt>Description</dt>' +
                                '<dd>' + description + '</dd>' +
                                '<dl>' +
                             '</div>';
      }).fail(function (error) {
        // Display Error message when cannot get data
        console.log('Error: ', error);
        self.markerContent = '<h4>' + self.title() + '</h4>' +
                             "Error: Cannot get location venue data.";
      });
  })();

}


// ViewModel
var ViewModel = function() {
  var self = this;
  // For the value typed in the search input text box
  self.searchString = ko.observable();
  // For List of locations
  self.locationsList = ko.observableArray([]);

  // Prepare locations list with the no. of locations given
  locations.forEach(function(locationItem){
    self.locationsList.push( new Location(locationItem) );
  });

  // Filter the locations list based on the search of location title
  self.filteredLocations = ko.computed(function () {
    // Prepare a pattern to match search string with location title
    var pattern = new RegExp(self.searchString(), 'i');
    // Passing location list array and get only matched with title
    return ko.utils.arrayFilter(self.locationsList(), function(location) {
      var isDisplay = pattern.test(location.title());
      // For filtering, display for only matched locations
      if (isDisplay) {
        location.display(true);
      } else {
        location.display(false);
      }
      return isDisplay;
    });
  }, self);

}

// Google Maps API initialization
function initMap() {
  // Hamburger Icon click functionality to show or hide sidebar
  var myWrapper = $("#wrapper");
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    myWrapper.one('webkitTransitionEnd otransitionend oTransitionEnd \
      msTransitionEnd transitionend', function(e) {
      // Resize map after show or hide of sidebar
      google.maps.event.trigger(map, 'resize');
    });
  });

  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.5150532, lng: -121.9170163},
    zoom: 12,
    mapTypeControl: false
  });

  // For infowindow, displays when Location Title on sidebar or marker
  // on map is clicked
  infowindow = new google.maps.InfoWindow();

  // Knockout JS binding to ViewModel
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel);
}

// Error function to display error when google map cannot be loaded
function error() {
    var $error = $('#error');
    var msg = 'Error:  Cannot load Google Maps'
    console.log(msg)
    $error.html(msg);
}
