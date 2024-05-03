<script>


	require([
	"esri/Map",
	"esri/Basemap",
	"esri/widgets/Home",
	"esri/layers/FeatureLayer",
	"esri/layers/GeoJSONLayer",
	"esri/renderers/UniqueValueRenderer",
	"esri/renderers/SimpleRenderer",
	"esri/symbols/SimpleFillSymbol",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/widgets/Legend",
	"esri/widgets/Fullscreen",
	"esri/widgets/Expand",
	"esri/views/MapView"
		], (Map, Basemap, Home, FeatureLayer, GeoJSONLayer, UniqueValueRenderer, SimpleRenderer, SimpleFillSymbol, SimpleMarkerSymbol, Legend, Fullscreen, Expand, MapView) => {

	// Link to the raw .geojson files containing stormwater asset info
	const geojsonurlBASIN = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/Basin.geojson";
	const geojsonurlBMP = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/BMP.geojson";
	const geojsonurlINLET = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/Inlet.geojson";
	const geojsonurlMANHOLE = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/Manhole.geojson";
	const geojsonurlOUTLET = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/Outlet.geojson";
	const geojsonurlPIPES = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/Pipes.geojson";
	const geojsonurlBOUNDARY = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/SummitSW/Boundary.geojson";

	// Define the popup for each feature

	const templateBASIN = {
		title: "{BASIN}",
	content: "{BASIN} in {CONDITION} condition."
	};
	const templateBMP = {
		title: "{BMP}",
	content: "BMP type is {BMP} in {CONDITION} condition. <br> <br> Notes: {CONDITION_}"
	};

		const templateINLET = {
			title: "{STRUCTURE}",
		content: "{STRUCTURE} in {CONDITION} condition. <br> <br> Notes: {CONDITION_} <br> <br> Asset Shape: {ASSET_SHAP} <br> <br> Number of Grates: {GRATE_NUMB} <br> <br> Material: {MATERIAL} <br> <br> Depth (in.): {DEPTH} <br> <br> Number of Pipes: {PIPE_NUMBE} <br> <br> Pipe 1 Azimuth: {PIPE1_AZIM} <br> <br> Pipe 1 Material: {PIPE1_MATE} <br> <br> Pipe 1 Diameter: {PIPE1_DIAM} <br> <br> Pipe 1 Invert: {PIPE1_INVE} <br> <br> Pipe 2 Azimuth: {PIPE2_AZIM} <br> <br> Pipe 2 Material: {PIPE2_MATE} <br> <br> Pipe 2 Diameter: {PIPE2_DIAM} <br> <br> Pipe 2 Invert: {PIPE2_INVE} <br> <br> Pipe 3 Azimuth: {PIPE3_AZIM} <br> <br> Pipe 3 Material: {PIPE3_MATE} <br> <br> Pipe 3 Diameter: {PIPE3_DIAM} <br> <br> Pipe 3 Invert: {PIPE3_INVE} <br> <br> Pipe 4 Azimuth: {PIPE4_AZIM} <br> <br> Pipe 4 Material: {PIPE4_MATE} <br> <br> Pipe 4 Diameter: {PIPE4_DIAM} <br> <br> Pipe 4 Invert: {PIPE4_INVE}"
	};
			const templateMANHOLE = {
				title: "Storm Drain",
			content: "Storm drain in {CONDITION} condition. <br> <br> Notes: {CONDITION_} <br> <br> Depth (in.): {DEPTH} <br> <br> Number of Pipes: {PIPE_NUMBE} <br> <br> Pipe 1 Azimuth: {PIPE1_AZIM} <br> <br> Pipe 1 Material: {PIPE1_MATE} <br> <br> Pipe 1 Diameter: {PIPE1_DIAM} <br> <br> Pipe 1 Invert: {PIPE1_INVE} <br> <br> Pipe 2 Azimuth: {PIPE2_AZIM} <br> <br> Pipe 2 Material: {PIPE2_MATE} <br> <br> Pipe 2 Diameter: {PIPE2_DIAM} <br> <br> Pipe 2 Invert: {PIPE2_INVE} <br> <br> Pipe 3 Azimuth: {PIPE3_AZIM} <br> <br> Pipe 3 Material: {PIPE3_MATE} <br> <br> Pipe 3 Diameter: {PIPE3_DIAM} <br> <br> Pipe 3 Invert: {PIPE3_INVE} <br> <br> Pipe 4 Azimuth: {PIPE4_AZIM} <br> <br> Pipe 4 Material: {PIPE4_MATE} <br> <br> Pipe 4 Diameter: {PIPE4_DIAM} <br> <br> Pipe 4 Invert: {PIPE4_INVE}"
	};
				const templateOUTLET = {
					title: "{STRUCTURE}",
				content: "{STRUCTURE} in {CONDITION} condition. <br> <br> Notes: {CONDITION_} <br> <br> Asset Shape: {ASSET_SHAP} <br> <br> Material: {MATERIAL} <br> <br> Quality improvement: {QUALITY_IM} <br> <br> Improvement Type: {IMPROVEMEN} <br> <br> Improvement Note: {IMPROVEM_1} <br> <br> Depth (in.): {DEPTH} <br> <br> Number of Pipes: {PIPE_NUMBE} <br> <br> Pipe 1 Azimuth: {PIPE1_AZIM} <br> <br> Pipe 1 Material: {PIPE1_MATE} <br> <br> Pipe 1 Diameter: {PIPE1_DIAM} <br> <br> Pipe 1 Invert: {PIPE1_INVE} <br> <br> Pipe 2 Azimuth: {PIPE2_AZIM} <br> <br> Pipe 2 Material: {PIPE2_MATE} <br> <br> Pipe 2 Diameter: {PIPE2_DIAM} <br> <br> Pipe 2 Invert: {PIPE2_INVE} <br> <br> Pipe 3 Azimuth: {PIPE3_AZIM} <br> <br> Pipe 3 Material: {PIPE3_MATE} <br> <br> Pipe 3 Diameter: {PIPE3_DIAM} <br> <br> Pipe 3 Invert: {PIPE3_INVE} <br> <br> Pipe 4 Azimuth: {PIPE4_AZIM} <br> <br> Pipe 4 Material: {PIPE4_MATE} <br> <br> Pipe 4 Diameter: {PIPE4_DIAM} <br> <br> Pipe 4 Invert: {PIPE4_INVE}"
	};
					const templatePIPES = {
						title: "Stormwater Pipe",
					content: "Material: {PIPE_MATE} <br> <br> Diameter (in.): {PIPE_DIAM} <br> <br> Estimated Depth (in.): {WELL_DEPTH}"
	};

						const rendererBASIN = ({
							type: "simple",
						symbol: {
							type: "simple-fill",
						color: "rgba(39, 196, 245, 1)"
		}
	});

						const rendererBMP = ({
							type: "simple",
						symbol: {
							type: "simple-marker",
						size: 6,
						color: "rgba(137, 36, 213, 1)",
						outline: {
							width: 0.5,
						color: "black"
    			}
  		}
	});


						const rendererINLET = ({
							type: "simple",
						symbol: {
							type: "simple-marker",
						size: 6,
						color: "rgba(148, 223, 0, 1)",
						outline: {
							width: 0.5,
						color: "black"
				}
			}
	});

						const rendererMANHOLE = ({
							type: "simple",
						symbol: {
							type: "simple-marker",
						size: 6,
						color: "rgba(245, 238, 39, 1)",
						outline: {
							width: 0.5,
						color: "black"
				}
			}
	});

						const rendererOUTLET = ({
							type: "simple",
						symbol: {
							type: "simple-marker",
						size: 6,
						color: "rgba(231, 78, 58, 1)",
						outline: {
							width: 0.5,
						color: "black"
				 }
			}
	});

						const rendererPIPES = ({
							type: "simple",
						symbol: {
							type: "simple-line",
						width: 1,
						color: "rgba(89, 96, 98, 1)"
			}
	});

						const rendererBOUNDARY = ({
							type: "simple",
						symbol: {
							type: "simple-fill",
						color: "rgba(245, 40, 145, 0)",
						outline: {
							width: 1,
						color: "orange"
				 }
			}
	});

						const geojsonBASIN = new GeoJSONLayer({
							url: geojsonurlBASIN,
						popupTemplate: templateBASIN,
						title: "Summit Basins",
						renderer: rendererBASIN
	});

						const geojsonBMP = new GeoJSONLayer({
							url: geojsonurlBMP,
						popupTemplate: templateBMP,
						title: "Summit BMPs",
						renderer: rendererBMP
	});


						const geojsonINLET = new GeoJSONLayer({
							url: geojsonurlINLET,
						popupTemplate: templateINLET,
						title: "Summit Inlets",
						renderer: rendererINLET
	});

						const geojsonMANHOLE = new GeoJSONLayer({
							url: geojsonurlMANHOLE,
						popupTemplate: templateMANHOLE,
						title: "Summit Manholes",
						renderer: rendererMANHOLE
	});

						const geojsonOUTLET = new GeoJSONLayer({
							url: geojsonurlOUTLET,
						popupTemplate: templateOUTLET,
						title: "Summit Outlets",
						renderer: rendererOUTLET
	});


						const geojsonPIPES = new GeoJSONLayer({
							url: geojsonurlPIPES,
						popupTemplate: templatePIPES,
						title: "Summit Stormwater Pipes",
						renderer: rendererPIPES
	});

						const geojsonBOUNDARY = new GeoJSONLayer({
							url: geojsonurlBOUNDARY,
						title: "Summit Boundary",
						renderer: rendererBOUNDARY
	});


						const map = new Map({
							basemap: "topo-vector",
						layers: [geojsonBOUNDARY, geojsonBASIN, geojsonPIPES, geojsonBMP, geojsonINLET, geojsonMANHOLE, geojsonOUTLET]
	})

						const view = new MapView({
							container: "viewDiv",
						map: map,
						zoom: 16,
						center: [-86.49351, 36.91434]
	});


						const fullscreen = new Fullscreen({
							view: view
	});

						const homeWidget = new Home({
							view: view
	});

						const legend = new Legend({
							view: view,
						content: [geojsonBOUNDARY, geojsonBASIN, geojsonPIPES, geojsonBMP, geojsonINLET, geojsonMANHOLE, geojsonOUTLET],
						style: "classic"
    });

						const legendExpand = new Expand({
							view: view,
						content: legend,
						closeOnEsc: false
	});

						view.ui.add(fullscreen, "top-left");
						view.ui.add(homeWidget, "top-left");
						view.ui.add(legendExpand, "bottom-right");
    });


</script>
