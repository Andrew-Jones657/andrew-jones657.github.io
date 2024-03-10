	// Create a map and set the view lat-long and zoom level 
	const map = L.map("map").setView([36.5980, -38.4648], 4);

	// Load in the basemap -- OpenStreetMaps
	const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 17,
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
		opacity: 0.90
	}).addTo(map);

	// Create a fullscreen button
	map.addControl(new L.Control.Fullscreen());

	// the url for the geojson file
	const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel22_23.geojson";
	
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
