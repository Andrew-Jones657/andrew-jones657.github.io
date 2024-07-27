        const map = L.map("map").setView([40.0491, -97.965], 3);


        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

	const info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		const contents = props ? `<b>${props.NAME}</b><br />${props.PER_BACH}% (${props.MOE}% Margin of Error)` : 'Hover over a state';
		this._div.innerHTML = `<h4>Percentage of Population over 25 with <br> a Bachelor's Degree or Higher in 2022</h4>${contents}`;
	};

	info.addTo(map);

	
	function getColor(d) {
    		return d > 24  ? '#4a1486' :
           	       d > 23  ? '#6a51a3' :
       		       d > 22  ? '#807dba' :
           	       d > 21  ? '#9e9ac8' :
           	       d > 19  ? '#bcbddc' :
           	       d > 17  ? '#dadaeb' :
           	       d > 13  ? '#f6f5fa' :
                      '#fcfbfd';
	}

	function style(feature) {
    		return {
        		weight: 2,
        		opacity: 1,
        		color: 'white',
        		dashArray: '3',
        		fillOpacity: 0.7,
        		fillColor: getColor(feature.properties.PER_BACH)
          	};
	}

	function highlightFeature(e) {
		const layer = e.target;

		layer.setStyle({
			weight: 5,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		layer.bringToFront();

		info.update(layer.feature.properties);
	}

        // the url for the geojson file
        const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/LeafletTutorial/US_States_Bach.geojson";
   
        // Provide the geoJSON layer 
        const geojsonLayer = new L.GeoJSON.AJAX(geojsonurl, {
		style,
		onEachFeature: onEachFeature
	}).addTo(map);

	function resetHighlight(e) {
		geojsonLayer.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

        function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	const legend = L.control({position: 'bottomright'});


	legend.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info legend');
		const grades = [13, 16, 19, 21, 22, 23, 25];
		let labels = [];
		labels.push(
			`<div ><h4 class='legend-title'>% Bachelor's <br> Attainment </h4></div>`
		);
		let from, to;

		for (let i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}%` : '%+'}`);
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
			`<div ><p style='data-source'><h4> Data Source:</h4> <a href="https://data.census.gov/table/ACSDP5Y2022.DP02?g=010XX00US$0400000&y=2022&d=ACS%205-Year%20Estimates%20Data%20Profiles">ACS 2022 5-Year <br> Estimates Data Profile</a></p></div>`
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
