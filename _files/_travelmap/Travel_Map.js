	// Create a map and set the view lat-long and zoom level 
	const map = L.map("map").setView([36.5980, -38.4648], 2);

	// Load in the basemap -- OpenStreetMaps
	const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	// Create a fullscreen button
	map.addControl(new L.Control.Fullscreen());

	// the url for the geojson file
	const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/Travel_22_23.geojson";
	
	// Create popups and bind the Name and Url fields from the geojson file to the popups
	function onEachFeature(feature, layer) {
  		if (feature.properties) {
    			layer.bindPopup(
					feature.properties.Name + 
					'</br>' + ' ' + '</br>' + 
					feature.properties.Month + ' ' + feature.properties.Day + ', ' + feature.properties.Year +
					'</br>' + ' ' + '</br>' +  
					"<img src=" + feature.properties.Url + ".jpg" + ' width="300" height=auto >'); 
  		}
	}

	// Initiate the cluster group
	var clusterLayer = L.markerClusterGroup();
	
	// Provide the geoJSON layer 
	var geojsonLayer = new L.GeoJSON.AJAX(geojsonurl, {
 	 onEachFeature: onEachFeature
	});

	// Load the geoJSON layer into the cluster group
	geojsonLayer.on('data:loaded', function () {
	  clusterLayer.addLayer(geojsonLayer);
	  map.addLayer(clusterLayer);
	});
