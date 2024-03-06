      require(["esri/Map", "esri/Basemap", "esri/widgets/Expand", "esri/widgets/Home", "esri/layers/GeoJSONLayer", "esri/widgets/Fullscreen", "esri/widgets/Legend", "esri/views/MapView", "esri/widgets/Swipe"], (Map, Basemap, Expand, Home, GeoJSONLayer, Fullscreen, Legend, MapView, Swipe) => {
        const url_2013 = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/CDs/MO_CDs_2013.geojson";
	const url_2023 = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/CDs/MO_CDs_2023.geojson";
        

	let bordersRenderer = {
	  type: "unique-value",
	  field: "NAMELSAD",
	  defaultSymbol: { type: "simple-fill" },
	  uniqueValueInfos: [{

	    value: "Congressional District 1",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(255,127,127,0.5)"
	    }
	  }, {
      
            value: "Congressional District 2",
	    symbol: {
	      type: "simple-fill",
              color: "rgba(115,223,255,0.5)"
	    }
	  }, {
            
	    value: "Congressional District 3",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(255,190,232,0.5)"
	    }
	  }, {

	    value: "Congressional District 4",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(255,255,168,0.5)"
	    }
	  }, {

	    value: "Congressional District 5",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(255,211,127,0.5)"
	    }
	  }, {

	    value: "Congressional District 6",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(202,169,245,0.5)"
	    }
	  }, {

	    value: "Congressional District 7",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(215,194,158,0.5)"
	    }
	  }, {

	    value: "Congressional District 8",
	    symbol: {
	      type: "simple-fill",
	      color: "rgba(211,255,190,0.5)"
	    }
	  }],
        };

        const geojsonLayer2013 = new GeoJSONLayer({
	  url: url_2013,
	  listmode: "hide",
	  legendEnabled: false, // has to be lowercase, boolean (not string!)
	  renderer: bordersRenderer,
	  title: "Congressional Districts"
        });
      
	const geojsonLayer2023 = new GeoJSONLayer({
	  url: url_2023,
	  renderer: bordersRenderer,
	  title: "Congressional Districts"
	});
    
	const map = new Map({
	  basemap: "topo-vector",
	  layers: [geojsonLayer2023, geojsonLayer2013]
	 });

        const view = new MapView({
          container: "viewDiv", // Reference to the view div created in step 5
          map: map, // Reference to the map object created before the view
          zoom: 8, // Sets zoom level based on level of detail (LOD)
          center: [-92.53817, 38.70275] // Sets center point of view using longitude,latitude
        });

	let legend = new Legend({
  	  view: view
	});
     
        const fullscreen = new Fullscreen({
          view: view
        });
	
	const swipe = new Swipe({
	  leadingLayers: [geojsonLayer2023],
	  trailingLayers: [geojsonLayer2013],
	  position: 50, // set position of widget to 50%
	  view: view
	}); 

      view.ui.add(fullscreen, "top-left");
      view.ui.add(legend, "bottom-right");
      view.ui.add(swipe);
      });