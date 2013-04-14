//Function that focus the map on the rectangle. The corners of this rectangle (diagonally opposite) are startLatLng and latlng

function newBBox(startLatLng, latlng){ 
	//Creation of the variables latmin latmax lngmin lngmax
	var latmin = Math.min(startLatLng.lat, latlng.lat),
	latmax = Math.max(startLatLng.lat, latlng.lat) ,
	lngmin = Math.min(startLatLng.lng, latlng.lng) ,
	lngmax = Math.max(startLatLng.lng, latlng.lng) ;

	//Creation of points to define the BoundingBox. Then creation of the BBox
	var southWest = new L.LatLng(latmin, lngmin),
		northEast = new L.LatLng(latmax, lngmax),
		BBox = new L.LatLngBounds(southWest, northEast);

	//Cropping the map
	map.fitBounds(BBox);
}




$('#zoom').click(function() {

	var startLatLng,latlng, shape;
	map._container.style.cursor = 'crosshair';

	//adding an EventListener 
	map.addEventListener('click', function(e) { 

			 startLatLng=e.latlng;
			 map.removeEventListener('click') ; //removing the EventListener 
			 
			 //adding the EventListener mouseMove in order to draw the rectangle selection for each movement
			 map.addEventListener('mousemove', function(e3) {
				latlng=e3.latlng;
				if (!shape) {
					shape = new L.Rectangle(new L.LatLngBounds(startLatLng, latlng), {color: '#007FFF', weight: 2, opacity: 0.8, fill: true, fillColor: '#FFFFFF',	fillOpacity: 0.6});
					map.addLayer(shape);
				} else {
					shape.setBounds(new L.LatLngBounds(startLatLng, latlng));
				}
			 });
			 
			 //adding the EventListener click, to know when the user has finished this selection
			 map.addEventListener('click', function(e2) {  
				latlng=e2.latlng;
				map.removeEventListener('click') ; //removing the EventListener click
				map.removeEventListener('mousemove') ; //removing the EventListener mousemove
				//Removing the selection rectangle and changing the BBox of the map
				map.removeLayer(shape);
				newBBox(startLatLng, latlng) ;
				map._container.style.cursor = '';

			 });	
			 
	});

});