# My Neighbourhood Map!
The My Neighbourhood App shows my location area with Google Map.  It shows
nearby highlighted locations with Google Map and Markers.  It shows the
list of locations on left sidebar.  You can search for specific locations
names by typing a search word in the input text field.  It will filter and
display the list.

Clicking the Location Name on the left side bar or clicking the marker on the
right google map, will display an infowindow showing the location photo,
address and description if available.  The photo, address, and description
are from FourSquare API, which gets a particular location details based on
venue id.

You can click the Hamburger Icon on top left side of the main page, to show
or hide the sidebar showing input field and list of locations.

This App is a application developed using:
Google Maps API
FourSquare API
HTML, CSS, Bootstrap Framework
Javascript, Knockout JS Framework
Ajax, jQuery, JSON


# Table of Contents
1. [Author](#author)
2. [Instructions on running the project](#instructions)
3. [Directory Structure](#directory-structure)
4. [Resources Used](#resources-used)


<br><br>
### <a name="author"></a>1. Author

Anilkumar P
<br>
<br>
<br>

### <a name="instructions"></a>2. Instructions on running the project

1) First unzip the zip file to fullstack
2) In that unzipped director you see directories and files as listed in
   section 3. Directory Structure
3) Make sure you have your local web setup to access this application as
   http://localhost:8000.  If you are not sure you can use below method
   to setup:
   - If you don't have Python on your system, download and install Python
     by following link https://www.python.org/downloads/
   - After you have python on your system, open Command prompt/terminal and
     cd to that directory
   - Then execute below python command in that directory where index.html
     file is present
     ```
     $ python -m SimpleHTTPServer

     ```
   - After this open your browser and go to url http://localhost:8000 to
     see the application
4) Click the Hamburger Icon to show or hide the sidebar.  Type some words
   on text input to search for places based on work (For example: park).
   See the list gets filtered.  Then click the Location name or marker on
   the map to get a infowindow with additional details.


<br>
<br>
<br>

### <a name="directory-structure"></a>3. Directory Structure

```
-MyNeighbourhoodMap
   Directory contains below directories and file:
      README.md - This readme file
      index.html - The HTML file to display the web page
      css - Directory for CSS Style Files
         bootstrap.min.css - styles for bootstrap framework
         nhm.css - custom styles for this application
      js - Directory for Javascript and libraries used
         app.js - javascript for this application
         lib - Directory for Javascript libraries
            bootstrap.min.js - javascript for bootstrap framework
            knockout-3.4.2.js - Knockout JS Framework for this app's Javascript

```

<br>
<br>
<br>

### <a name="resources-used"></a>3. Resources Used

1) Udacity (www.udacity.com) Full Stack Nanodegree Course Material
   https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd004
2) Bootstrap Framework
   http://getbootstrap.com/
3) Knockout JS Framework
   http://knockoutjs.com/
4) Google Maps API
   https://developers.google.com/maps/documentation/javascript/tutorial
5) FourSquare Location API
   https://developer.foursquare.com/overview/samples
6) App side bar and map
   http://stackoverflow.com/questions/35610873/google-maps-with-responsive-sidebar
7) Several other google.com search and stackoverflow.com resources, for things
   that are not on top of my head.
