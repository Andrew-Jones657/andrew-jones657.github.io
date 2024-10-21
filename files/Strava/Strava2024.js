            require([
            "esri/Map",
            "esri/layers/GeoJSONLayer",
            "esri/views/MapView",
	    "esri/popup/content/ExpressionContent",
	    "esri/PopupTemplate",
	    "esri/widgets/smartMapping/support/utils",
	    "esri/widgets/Legend",
	    "esri/widgets/Fullscreen",
	    "esri/widgets/Expand",
	    "esri/widgets/Home",
	    "esri/core/reactiveUtils"
    ], (Map, GeoJSONLayer, MapView, ExpressionContent, PopupTemplate, smartMappingUtils, Legend, Fullscreen, Expand, Home, reactiveUtils) => {
                (async () => {

		    // import the geojson file containing the bike ride information
                    const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/Strava/StravaBike2024.geojson";

		    // create a map object with a labeled imagery basemap
                    const map = new Map({
                        basemap: "hybrid"
                    });
		
		    // Setup the map view (zoom level, center) and dock the popups on the bottom left so users can see the selected routes
                    const view = new MapView({
                        container: "viewDiv",
			popup: {
                    		dockEnabled: true,
                    		autoOpenEnabled: true,
                    		dockOptions: {
                        	// Ignore the default sizes that trigger responsive docking
                        		breakpoint: false,
                        		position: "bottom-left"
				}
                    	},
                        map: map,
                        center: [-86.4463, 36.9913],
                        zoom: 11,
                        padding: {
                            right: 300
                        }

                    });

		    //
                    const listNode = document.getElementById("strava_graphics");

                    // Define the content of the popups (Ride name, ride date, ride difficulty, ride distance covered, ride elevation gain, ride time elapsed, image taken during ride)
	            // The expressions are used to round the the distance covered and time elapsed variables
                    const template = {
                        title: "{Name}",
                        content: "{Name} recorded on {Date_Text} <br> Difficulty: {Toughness} <br> Elevation Gain: {Elevation_Gain} ft. <br> Distance: {expression/Length_Round} mi. <br> Time Elapsed: {expression/Time_Round} hrs.  <br> <br> <img src={ImageLink}.jpg width='450' height=auto >",
                        expressionInfos: [{
                            name: "Length_Round",
                            expression: "Round($feature.Length, 2)"
                        }, {
                            name: "Time_Round",
                            expression: "Round($feature.Test_Time, 2)"
                        }]
                    };


                    // Create a unique value symbology using the "Month" variable and "uniqueValueGroups []" so that trips are grouped by a unique color  
                    const renderer = ({
                        type: "unique-value",
                        field: "Month",
                        uniqueValueGroups: [{
                            classes: [{
                                label: "April",
                                symbol: { type: "simple-line", color: "rgba(152, 230, 0, 1)", width: "3px" },
                                values: "April"
                            }]
                        }, {
                            classes: [{
                                label: "May",
                                symbol: { type: "simple-line", color: "rgba(202, 122, 245, 1)", width: "3px" },
                                values: "May"
                            }]
                        }, {
                            classes: [{
                                label: "June",
                                symbol: { type: "simple-line", color: "rgba(255, 151, 56, 1)", width: "3px" },
                                values: "June"
                            }]
                        }, {
                            classes: [{
                                label: "August",
                                symbol: { type: "simple-line", color: "rgba(168, 0, 0, 1)", width: "3px" },
                                values: "August"
                            }]
                        }, {
                            classes: [{
                                label: "September",
                                symbol: { type: "simple-line", color: "rgba(115, 223, 255, 1)", width: "3px" },
                                values: "September"
                            }]
                        }, {
                            classes: [{
                                label: "October",
                                symbol: { type: "simple-line", color: "rgba(68, 48, 137, 1)", width: "3px" },
                                values: "October"
                            }]
                        }]
                    });


                    // create the geojsonLayer using the previously defined renderer and popupTemplate. Use the "Date" field as an outfield to later organize the ride names on the side.
                    const geojsonLayer = new GeoJSONLayer({
                        url: geojsonurl,
                        outFields: ["Name", "Date", "Date_Text", "Length"], // used by queryFeatures
                        renderer: renderer,
                        popupTemplate: template,
			title: "Bike Rides by Month"
                    });
                    map.add(geojsonLayer);

                    let graphics;

                    const layerView = await view.whenLayerView(geojsonLayer);
		    
		    // Create a list of the features in the current view, sort them ascending by Date, and display them on the right side of the map
                    reactiveUtils.when(
                        () => !layerView.dataUpdating,
                        async () => {
                            // query all the features available for drawing.
                            try {
                                const featureSet = await layerView.queryFeatures({
                                    geometry: view.extent,
                                    returnGeometry: true,
                                    orderByFields: ["Date"]
                                });

                                graphics = featureSet.features;

                                const fragment = document.createDocumentFragment();

                                graphics.forEach((result, index) => {
                                    const attributes = result.attributes;
                                    const name = attributes.Name;

                                    // Create a list zip codes in NY
                                    const li = document.createElement("li");
                                    li.classList.add("panel-result");
                                    li.tabIndex = 0;
                                    li.setAttribute("data-result-id", index);
                                    li.textContent = name;

                                    fragment.appendChild(li);
                                });
                                // Empty the current list
                                listNode.innerHTML = "";
                                listNode.appendChild(fragment);
                            } catch (error) {
                                console.error("query failed: ", error);
                            }
                        }
                    );
		    // Create an event handler when an object is selected from the list 
                    const onListClickHandler = async (event) => {
                        const target = event.target;
                        const resultId = target.getAttribute("data-result-id");

                        // get the graphic corresponding to the clicked bike route
                        const result = resultId && graphics && graphics[parseInt(resultId, 10)];

                        if (result) {
                            try {
                                await view.goTo(result.geometry.extent.expand(2));

                                view.openPopup({
                                    features: [result],
                                    location: result.geometry.centroid
                                });
                            } catch (error) {
                                if (error.name != "AbortError") {
                                    console.error(error);
                                }
                            }
                        }
                    };
                    // listen to click event on the bike name list
                    listNode.addEventListener("click", onListClickHandler);

	// add a fullscreen button
       const fullscreen = new Fullscreen({
  	view: view
	});
	
	// add a home button that returns to the default view
       const homeWidget = new Home({
  	  view: view
	});

	// add a legend that describes which colors belong to which month
       const legend = new Legend({
  	  view: view,
	  content: [geojsonLayer],
	  style: "card"
        });

	// Hide the legend when it is not in use
       const legendExpand = new Expand({
	  view: view,
	  content: legend,
	  closeOnEsc: false
	});

     view.ui.add(fullscreen, "top-left");
     view.ui.add(homeWidget, "top-left");
     view.ui.add(legendExpand, "top-left");
                })();
      });
