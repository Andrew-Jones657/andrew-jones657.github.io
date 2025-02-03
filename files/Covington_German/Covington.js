	require([
		"esri/Map", 
		"esri/Basemap", 
		"esri/widgets/Home", 
		"esri/layers/GeoJSONLayer",
		"esri/renderers/UniqueValueRenderer", 
		"esri/symbols/SimpleFillSymbol",
	        "esri/widgets/Legend",
		"esri/widgets/Fullscreen", 
		"esri/widgets/Expand",
		"esri/views/MapView",
		"esri/core/reactiveUtils"
		], (Map, Basemap, Home, GeoJSONLayer, UniqueValueRenderer, SimpleFillSymbol, Legend, Fullscreen, Expand, MapView, reactiveUtils) => {

	// Declare a variable for the layer view that will later be used to feature filters by year
        let yearLayerView;

	const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/Covington_German/Institutions_1861_1920.geojson";


       // Define the popup for each point which shows the name of the institution, its historical location, what kind of institution it was, and whether it was German or not
       const template = {
	 title: "{Name}",
	 content: "Name: {Name} <br> Year: {Year} <br> Historical Location: {Address} <br> Institution Type: {Type} <br> German: {German}"
	};	


       // Create a unique value symbology using the "Type_German" variable and "uniqueValueGroups []" so that institutions/German institions are grouped by a unique color and German institutions have a yellow outline  
       const renderer = ({
        type: "unique-value",
        field: "Type_German",
    	uniqueValueGroups: [{
            heading: "Bank",
            classes: [{
                label: "Bank",
                symbol: { type: "simple-marker", color: "rgba(38, 115, 0, 1)", outline: { color: "rgba(0, 0, 0, 1)", width: 1 }, },
                values: "Bank no"
            }]
         }, {
            heading: "German Bank",
            classes: [{
                label: "German Bank",
                symbol: { type: "simple-marker", color: "rgba(38, 115, 0, 1)", outline: { color: "rgba(255, 255, 0, 0.8)", width: 3 }, },
                values: "Bank yes"
            }]
         }, {
            heading: "Brewery",
            classes: [{
                label: "Brewery",
                symbol: { type: "simple-marker", color: "rgba(255, 170, 0, 1)", outline: { color: "rgba(0, 0, 0, 1)", width: 1 }, },
                values: "Brewery no"
            }]
         }, {
            heading: "German Brewery",
            classes: [{
                label: "German Brewery",
                symbol: { type: "simple-marker", color: "rgba(255, 170, 0, 1)", outline: { color: "rgba(255, 255, 0, 0.8)", width: 3 }, },
                values: "Brewery yes"
            }]
         }, {
            heading: "Church",
            classes: [{
                label: "Church",
                symbol: { type: "simple-marker", color: "rgba(255, 255, 255, 1)",  outline: { color: "rgba(0, 0, 0, 1)",   width: 1 },  },
                values: "Church no"	  
	    }]
         }, {
            heading: "German Church",
            classes: [{
                label: "German Church",
                symbol: {type: "simple-marker", color: "rgba(255, 255, 255, 1)",  outline: { color: "rgba(255, 255, 0, 0.8)",  width: 3 }  },
                values: "Church yes"	  
	    }]
         },  {
            heading: "Government",
            classes: [{
                label: "Government",
                symbol: {type: "simple-marker", color: "rgba(197, 0, 255, 1)",  outline: { color: "rgba(0, 0, 0, 1)",  width: 1 }  },
                values: "Government no"	  
	    }]
         }, {
            heading: "Justice of the Peace",
            classes: [{
                label: "Justice of the Peace",
                symbol: {type: "simple-marker", color: "rgba(0, 92, 230, 1)",  outline: { color: "rgba(0, 0, 0, 1)",  width: 1 }  },
                values: "Justice of the Peace no"	  
	    }]
         }, {
            heading: "German Justice of the Peace",
            classes: [{
                label: "German Justice of the Peace",
                symbol: {type: "simple-marker", color: "rgba(0, 92, 230, 1)",  outline: { color: "rgba(255, 255, 0, 0.8)",  width: 3 }  },
                values: "Justice of the Peace yes" 
	    }]
         }, {
            heading: "Other German Institutions",
            classes: [{
                label: "Miscellaneous",
                symbol: {type: "simple-marker", color: "rgba(253, 182, 208, 1)",  outline: { color: "rgba(255, 255, 0, 0.8)",  width: 3 }  },
                values: "Miscellaneous yes" 
	    }]
         }, {
            heading: "Saloon",
            classes: [{
                label: "Saloon",
                symbol: {type: "simple-marker", color: "rgba(255, 0, 0, 1)",  outline: { color: "rgba(255, 255, 0, 1)",  width: 1 }  },
                values: "Saloon no" 
	    }]
         }, {
            heading: "German Saloon",
            classes: [{
                label: "German Saloon",
                symbol: {type: "simple-marker", color: "rgba(255, 0, 0, 1)", outline: { color: "rgba(255, 255, 0, 0.8)",  width: 3 }  },
                values: "Saloon yes"
	    }]
	  }, {
            heading: "Social Association",
            classes: [{
                label: "Social Association",
                symbol: {type: "simple-marker", color: "rgba(230, 230, 0, 1)", outline: { color: "rgba(255, 255, 0, 1)",  width: 1 }  },
                values: "Social Association no"
	    }]
	  }, {
            heading: "German Social Association",
            classes: [{
                label: "German Social Association",
                symbol: {type: "simple-marker", color: "rgba(230, 230, 0, 1)", outline: { color: "rgba(255, 255, 0, 0.8)",  width: 3 }  },
                values: "Social Association yes"
	    }]
	  }]
	});

	// load in the geoJSON covington institutions point layer
	const geojsonLayer = new GeoJSONLayer({
		url: geojsonurl,
		popupTemplate: template,
		title: "Covington's German Element, 1861 - 1920",
		renderer: renderer
	});


	// create a new map object with the dark grey basemap and geojson point layer
	const map = new Map({
		basemap: "dark-gray",
		layers: [geojsonLayer]
	});


	// set the view position for the map
	const view = new MapView({
		container: "viewDiv",
		map: map,
		zoom: 13,
		center: [-84.509852, 39.081289]
	});

	// Define nodes to query the year elements and use the "getElementById" method to extract the information from the html div elements (the same years as in the geojson layer)
        const yearsNodes = document.querySelectorAll(`.year-item`);
        const yearsElement = document.getElementById("years-filter");

        // click event handler for years choices
        yearsElement.addEventListener("click", filterByYear);



        // User clicked on 1861, 1871, 1880, 1890, 1900, 1910, or 1920
        // set an attribute filter on year layer view
        // to display the institutions from that year (note the {Year} field is text, not numeric) 
        function filterByYear(event) {
          const selectedYear = event.target.getAttribute("data-year");
          yearLayerView.filter = {
            where: "Year = '" + selectedYear + "'"
          };
        }
	
      // Setup layer view to react to geojson layer (Covington Institutions)
        view.whenLayerView(geojsonLayer).then((layerView) => {
          // Covington institutions layer loaded
          // get a reference to the Covington institutions layerview
          yearLayerView = layerView;

          // set up UI items
          yearsElement.style.visibility = "visible";
          const yearsExpand = new Expand({
            view: view,
            content: yearsElement,
            expandIconClass: "esri-icon-filter",
            group: "top-left"
          });

          //clear the filters when user closes the expand widget
          yearsExpand.watch("expanded", () => {
            if (!yearsExpand.expanded) {
              yearLayerView.filter = null;
            }
          });

          view.ui.add(yearsExpand, "top-left");
          view.ui.add("titleDiv", "top-right");
	  });

	// enable users to hover over points and automatically open popups 
	view.on("pointer-move", function (event) { 
          view.hitTest(event).then(function (response) { 
            if (response.results.length) { 
              var graphic = response.results.filter(function (result) { 
               // check if the graphic belongs to the layer of interest 
               return result.graphic.layer === geojsonLayer; 
             })[0].graphic; 
             view.popup.open({ 
               location: graphic.geometry.centroid, 
               features: [graphic] 
             }); 
           } else { 
             view.popup.close(); 
           } 
         }); 
       }); 

       	// add a fullscreen button
       const fullscreen = new Fullscreen({
  	view: view
	});

       const homeWidget = new Home({
  	  view: view
	});

       const legend = new Legend({
  	  view: view,
	  content: [geojsonLayer],
	  style: "card"
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
