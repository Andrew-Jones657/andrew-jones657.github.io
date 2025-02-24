    const map = L.map("map").setView([38.962576, -92.329513], 9);

    const tiles = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	      minZoom: 5,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

    const geojsonUrl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/BooneGrowth.geojson";

    const booneUrl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/Boone.geojson";

    const boonePlaces00url = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/BoonePlaces00.geojson";

    const boonePlaces20url = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/ColumbiaRemote/BoonePlaces20.geojson";

    const booneLayer = new L.GeoJSON.AJAX(booneUrl, {color: 'black'}).addTo(map);

    const boonePlaces00 = new L.GeoJSON.AJAX(boonePlaces00url, {color: 'gold'}).addTo(map);

    const boonePlaces20 = new L.GeoJSON.AJAX(boonePlaces20url, {color: 'green'}).addTo(map);

    const geojsonLayer = new L.GeoJSON.AJAX(geojsonUrl, {color: 'red'}).addTo(map);


	const dataSource = L.control({position: 'bottomleft'});

	dataSource.onAdd = function (map) {

		const div = L.DomUtil.create('div', 'info dataSource');
		let dSource = [];
		dSource.push(
			`<div ><p style='data-source'><h4> Urban Development Areas from 2000 to 2024 </h4> <br> Boone County, Missouri </p></div>`
		);

		div.innerHTML = dSource.join('<br>');
		return div;

	};

	dataSource.addTo(map);
