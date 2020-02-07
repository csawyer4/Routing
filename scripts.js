var map = L.map('map').setView([47.25, -122.44], 11);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g',
}).addTo(map);

var control = L.Routing.control({
    waypoints: [
      null
        // L.latLng(47.246587, -122.438830),
        // L.latLng(47.258024,  -122.444725),
        // L.latLng(47.318017, -122.542970)
    ],
     routeWhileDragging: true,
     router: L.Routing.mapbox('pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g'),
     units:'imperial',
     collapsible: true,
     show: false,
     geocoder: L.Control.Geocoder.mapbox('pk.eyJ1IjoiY3Nhd3llcjQiLCJhIjoiY2syc2g2bnlzMGtyeDNubW55bHRzNnkzOSJ9.WZ63B0C4v437JrMyODN-6g')
}).addTo(map);

function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function(e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

    L.DomEvent.on(startBtn, 'click', function() {
            control.spliceWaypoints(0, 1, e.latlng);
            map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function() {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        control.show();
        map.closePopup();
    });
 });

 function onLocationFound(e) {

     L.marker(e.latlng).addTo(map)
         .bindPopup("This is your approximate location. <br>Click on the map to create a start/end location for your route.").openPopup();

 }
 function onLocationError(e) {
   alert(e.message);
 }

 map.on('locationfound', onLocationFound);//this is the event listener
 map.on('locationerror', onLocationError);

 map.locate({setView: true, maxZoom: 16});

 var stateChangingButton = L.easyButton({
    states: [{
            stateName: 'zoom-to-school',
            icon:      'fa fa-child',
            title:     'zoom to your location',
            onClick: function(btn, map) {
              map.locate({setView: true, maxZoom: 16});
            }
    }]
});

stateChangingButton.addTo(map);

window.alert("Alert\nThis site wants to use your location data to show you where you are on a map. This data is being used to make routing easier for you if you are navigating from your location. Your location data will not be stored or shared with anyone. To block/unblock this site from using your location data, go to your browser settings.")
