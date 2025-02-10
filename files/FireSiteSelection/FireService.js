
        const map = L.map("map").setView([36.995269, -86.4426001], 12);

        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);



	function getColor(d) {
    		return d > 15  ? '#FE7A18' :
           	       d > 12  ? '#FDC420' :
       		       d > 10  ? '#F7EF24' :
           	       d > 8  ? '#DBF124' :
           	       d > 5  ? '#A3CE22' :
           	       d > 0  ? '#3D961B' :
                      '#191919';
	}


	function style(feature) {
    		return {
        		weight: 2,
        		opacity: 1,
        		color: 'black',
        		dashArray: '1',
        		fillOpacity: 0.5,
        		fillColor: getColor(feature.properties.ToBreak)
          	};
	}

	// Create popups and bind the Name and Percent Bachelor Degree Holder fields from the geojson file to the popups
        function onEachFeature(feature, layer) {
  		    if (feature.properties) {
                		layer.bindPopup(
					'Name:' + ' ' + feature.properties.Place_name + '</br>' +	
					'Address:' + ' ' + feature.properties.ADDRESS + '</br>' +
					'Type:' + ' ' + feature.properties.Prof_Vol);
  	            }
    	}



	const fireStationsUrl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/FireStations.geojson";

	const currentFireServiceUrl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/CurrentFireService.geojson";

	const alvatonFireServiceUrl  = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/AlvatonFireService.geojson";

	const houndsRunFireServiceUrl  = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/HoundsRunFireService.geojson";

	const mtOlivetFireServiceUrl  = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/MtOlivetFireService.geojson";

	const planoFireServiceUrl  = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/PlanoFireService.geojson";
 
	const woodburnFireServiceUrl  = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/FireSiteSelection/WoodburnFireService.geojson";

	const fireStationsLayer = new L.GeoJSON.AJAX(fireStationsUrl, {
		style: function(feature) {
  			var Station_Type = feature.properties.Station_Type;
  				if (Station_Type === 1) {
    					return { color: "red" }; 
  				} 
  				else if (Station_Type === 2) {
    					return { color: "orange" };
  				} 
  				else if (Station_Type === 3) {
    					return { color: "purple" };
  				} 
  				else {
    					return { color: "green" };
  				}
			},
			onEachFeature: onEachFeature,
			    pointToLayer: function(feature, latlng) {
      				return L.circleMarker(latlng);
    		},
	});
	
	const Current = new L.GeoJSON.AJAX(currentFireServiceUrl, {
		style
	}).addTo(map); 

        const Alvaton = new L.GeoJSON.AJAX(alvatonFireServiceUrl, {
		style
	});

        const Hounds_Run = new L.GeoJSON.AJAX(houndsRunFireServiceUrl, {
		style
	});

        const Mt_Olivet = new L.GeoJSON.AJAX(mtOlivetFireServiceUrl, {
		style
	});

        const Plano = new L.GeoJSON.AJAX(planoFireServiceUrl, {
		style
	});

        const Woodburn = new L.GeoJSON.AJAX(woodburnFireServiceUrl, {
		style
	});

	const primaryLayers = {"OSM": tiles};

	
    	var options = {
      	// Make the "Landmarks" group exclusive (use radio inputs)
      		exclusiveGroups: [fireStationsLayer],
      	// Show a checkbox next to non-exclusive group labels for toggling all
      		groupCheckboxes: true
    	};
	
	L.control.layers({"OSM":tiles}, {"Fire Stations": fireStationsLayer}).addTo(map);

	const overlayLayers = {"Current Fire Service": Current, Alvaton, "Hounds Run": Hounds_Run, "Mt. Olivet": Mt_Olivet, Plano, Woodburn};

	L.control.layers(overlayLayers).addTo(map);





	const legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [0, 5, 8, 10, 12, 15];
		let labels = [];
		labels.push(
			`<div ><h4 class='legend-title'>Response <br> Time (Min.) </h4></div>`
		);
		let from, to;

		for (let i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	// Add the legend to the map
	legend.addTo(map);

	const dataSource = L.control({position: 'bottomleft'});

	dataSource.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info dataSource');
		let dSource = [];
		dSource.push(
			`<div ><p style='data-source'><h4> Current and Potential Fire Service Coverage </h4> <br> Warren County, Kentucky </p></div>`
		);

		div.innerHTML = dSource.join('<br>');
		return div;

	};

	dataSource.addTo(map);

      // create fullscreen control
      var fsControl = L.control.fullscreen();

      // add fullscreen control to the map
      map.addControl(fsControl);

      // detect fullscreen toggling
      map.on('enterFullscreen', function(){
      		if(window.console) window.console.log('enterFullscreen');
      });

      map.on('exitFullscreen', function(){
		if(window.console) window.console.log('exitFullscreen');
      });
