     const [Map, SceneView, GeoJSONLayer, CustomContent, WebStyleSymbol, PictureMarkerSymbol, ElevationProfile, ElevationLayer, Graphic, SimpleRenderer, SimpleLineSymbol, Fullscreen] = await $arcgis.import([
     "@arcgis/core/Map.js",
     "@arcgis/core/views/SceneView.js",
     "@arcgis/core/layers/GeoJSONLayer",
     "@arcgis/core/popup/content/CustomContent",
     "@arcgis/core/symbols/WebStyleSymbol",
     "@arcgis/core/symbols/PictureMarkerSymbol",
     "@arcgis/core/widgets/ElevationProfile.js",
     "@arcgis/core/Graphic.js",
     "@arcgis/core/layers/ElevationLayer",
     "@arcgis/core/renderers/SimpleRenderer.js",
     "@arcgis/core/symbols/SimpleLineSymbol.js",
     "@arcgis/core/widgets/Fullscreen.js"
     ]);



const trailURL = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/Cumberland_Falls/CumberlandFallsTrails.geojson";

const photoURL = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/refs/heads/main/files/Cumberland_Falls/CumberlandFallsPhotos.geojson";

// Define the popup for each point which shows the name of the location, information about the location, and the photo itself 
const trailsTemplate = {
  title: "{TRAIL_NAME}",
  // Set the fieldInfos at the PopupTemplate level so all the
  // popup elements have the desired field formatting.
  fieldInfos: [
    {
        fieldName: "DESCRIPTN",
        visible: false
    },    
    {
        fieldName: "Length_MI",
        visible: true,
        label: "Length (mi.)"
    },
    {
        fieldName: "Est_Time",
        visible: true,
        label: "Estimated Time (min.)"
    },
    {
        fieldName: "Difficulty",
        visible: true,
        label: "Difficulty"
    },
    {
        fieldName: "Elev_Gain",
        visible: true,
        label: "Elevation Gain (ft.)"
    },
    {
        fieldName: "MIN_ELEV",
        visible: true,
        label: "Minimum Elevation (ft.)"
    },
    {
        fieldName: "MAX_ELEV",
        visible: true,
        label: "Maximum Elevation (ft.)"
    },
    {
        fieldName: "Image",
        visible: false
    },
   ],
      // Set content elements in the order to display.
      // The first element displayed is fields.
      content: [

	{
	type: "text",
	text: "Trail Description: {DESCRIPTN}", 
	},

	{
	type: "fields"
	},

       	{
        type: "media",
        mediaInfos: [
	  {
	  type: "image",
	  value: {
	    sourceURL: "{Image}.jpg"
	   }
          }
	 ]
        }      
     ]
  };

// Create a pop up for the photos as well as the elevation, date, and time the photo was taken
const photosTemplate = {
  title: "{Description}",
  content: 
    [

    {
    type: "text",
    text: "Photo Description: {Description}", 
    },

    {
    type: "fields",
    fieldInfos: 
      [{
      fieldName: "Elevation",
      label: "Elevation (ft.)",
      format: 
        {
        digitSeparator: true,
        places: 0
        },
      expression: "Floor($feature.Elevation)" 
      },
     {
      fieldName: "DateTime",
      label: "Date and Time",
      format: {
        dateFormat: "short-date-long-time"
      }
     },
    ]
   },
       	{
        type: "media",
        mediaInfos: [
	  {
	  type: "image",
	  value: {
	    sourceURL: "{Link}.jpg"
	   }
          }
	 ]
        } 
  ]  
  };

// Use the ArcGIS camera symbol for photo icons
const photoRenderer = {
	type: "simple",
	symbol: {
	  type: "web-style",
	  name: "Photography",
	  styleUrl: "https://cdn.arcgis.com/sharing/rest/content/items/36359a4a8f3143b6bf44d5688e007900/data"
	}
    };

  // Define the symbol for the lines
  const lineSymbol = new SimpleLineSymbol({
    color: [255, 228, 121], // Gold color
    width: 3, // 2 pixels wide
    style: "solid" // Solid line style
  });

// simple color renderer for Trails
const trailRenderer = new SimpleRenderer({
    symbol: lineSymbol
  });


// load in the trails
const trailsLayer = new GeoJSONLayer({
	  url: trailURL,
  	  outFields: ["*", "Image", "DESCRIPTN"],
	  popupTemplate: trailsTemplate,
	  renderer: trailRenderer,
	  title: "Cumberland Falls Trails"
	});



// load in the points representing photos
const photosLayer = new GeoJSONLayer({
	  url: photoURL,
	  mode: "relative-to-ground",
	  popupTemplate: photosTemplate,
	  renderer: photoRenderer,
	  title: "Photos from Cumberland Falls"
	});

// create the map with satellite imagery and ground elevation service
const map = new Map({
    basemap: "hybrid",
    ground: "world-elevation",
    layers: [photosLayer, trailsLayer]
});


// set the scene view angle and position, dock the popups, and set the weather as sunny
const view = new SceneView({
    container: "viewDiv",
    map: map,
    popup: {
	dockEnabled: true,
	dockOptions: {
          position: "bottom-left",
	  breakpoint: false
	  }
	},
    camera: {
        position: [-84.33786, 36.85567, 750],  
        heading: 190, // direction the camera is looking
        tilt: 70, // tilt of the camera relative to the ground
    },
    environment: {
      weather: {
        type: "sunny", // autocasts as new SunnyWeather({ cloudCover: 0.3 })
        cloudCover: 0.3,
    },
  },
});

       	// add a fullscreen button
       const fullscreen = new Fullscreen({
  	view: view
	});


  // Create an ElevationProfile widget (initially hidden or in a specific container)
  const elevationProfile = new ElevationProfile({
    view: view,
    unit: "feet",
    profiles: [
      {
        type: "ground"
      }
    ],
    // Customize visible elements if needed
    visibleElements: {
        legend: false,
    	clearButton: false,
    	settingsButton: false,
    	sketchButton: false,
    	selectButton: false,
    	uniformChartScalingToggle: true,
    }
  });

const contentWidget = new CustomContent({
  outFields: ['*'],
  creator: async ({ graphic }) => {
    if (graphic.geometry.type !== 'polyline') {
      return;
    }
    if (app.view && !elevationProfile.view) {
      elevationProfile.view = app.view;
    }
    elevationProfile.input = graphic;
    return elevationProfile;
  },
});



view.ui.add(elevationProfile, "bottom-right");


  // Click event handler
  view.on("click", function(event) {
    view.hitTest(event).then(function(response) {
      if (response.results.length) {
        const graphic = response.results.filter(function(result) {
          // Check if the graphic belongs to the trail layer and is a polyline
          return result.graphic.layer === trailsLayer && result.graphic.geometry.type === "polyline";
        })[0].graphic;

        if (graphic) {
          // Set the input graphic for the ElevationProfile widget
          elevationProfile.input = graphic;
          // Optionally, display the widget if it was hidden
          // elevationProfile.container.style.display = "block";
        } else {
          // No trail feature found at the clicked location
          console.log("No trail clicked.");
        }
      }
    });

view.ui.add(fullscreen, "top-right");

  });
