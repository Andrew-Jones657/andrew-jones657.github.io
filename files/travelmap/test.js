	// Create a map and set the view lat-long and zoom level 
	const map = L.map("map").setView([36.5980, -38.4648], 4);

	// Load in the basemap -- OpenStreetMaps
	const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		maxZoom: 17,
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
		opacity: 0.90
	}).addTo(map);
