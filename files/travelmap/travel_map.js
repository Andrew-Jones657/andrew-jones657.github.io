	require([
		"esri/Map", 
		"esri/Basemap", 
		"esri/widgets/Home", 
		"esri/layers/FeatureLayer", 
		"esri/layers/GeoJSONLayer",
		"esri/popup/content/ImageMediaInfo",
		"esri/renderers/UniqueValueRenderer", 
		"esri/symbols/SimpleFillSymbol",
	        "esri/widgets/Legend",
		"esri/widgets/Bookmarks", 
		"esri/widgets/Fullscreen", 
		"esri/widgets/Expand",
		"esri/views/MapView",
		"esri/webmap/Bookmark"
		], (Map, Basemap, Home, FeatureLayer, GeoJSONLayer, ImageMediaInfo, UniqueValueRenderer, SimpleFillSymbol, Legend, Bookmarks, Fullscreen, Expand, MapView, Bookmark) => {

       // Link to the raw .geojson file containing travel information and photo links
       const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/travel22_23.geojson";

       // Enable clustering for points to reduce clutter on the map
       const clusterConfig = {
          type: "cluster",
          clusterRadius: "100px",
          // {cluster_count} is an aggregate field containing
          // the number of features comprised by the cluster
          popupTemplate: {
            title: "Cluster summary",
            content: "This cluster represents {cluster_count} travel photos.",
            fieldInfos: [{
              fieldName: "cluster_count",
              format: {
                places: 0,
                digitSeparator: true
              }
            }]
          },
          clusterMinSize: "24px",
          clusterMaxSize: "60px",
          labelingInfo: [{
            deconflictionStrategy: "none",
            labelExpressionInfo: {
              expression: "Text($feature.cluster_count, '#,###')"
            },
            symbol: {
              type: "text",
              color: "#3b3b3b",
              font: {
                weight: "bold",
                family: "Noto Sans",
                size: "12px"
              }
            },
            labelPlacement: "center-center",
          }]
        };
   
       // Define the popup for each point which shows the name of the location, when the photo was taken, and the photo itself 
       const template = {
	 title: "{Name}",
	 content: "{Name} taken on {Month} {Day}, {Year} <br> <br> <img src={Url}.jpg width='450' height=auto >"
	};	

	


       // Create a unique value symbology using the "State" variable and "uniqueValueGroups []" so that trips are grouped by a unique color  
       const renderer = ({
        type: "unique-value",
        field: "State",
    	uniqueValueGroups: [{
            heading: "Monument Valley, Feb 2022",
            classes: [{
                label: "Arizona and Utah",
                symbol: { type: "simple-marker", color: "rgba(79, 111, 190, 1)", outline: { color: "rgba(123, 159, 226, 0.8)", width: 5 }, },
                values: ["Arizona", "Utah"]
            }]
         }, {
            heading: "Johnson's Shut Ins, May 2022",
            classes: [{
                label: "Missouri",
                symbol: { type: "simple-marker", color: "rgba(12, 122, 36, 1)",  outline: { color: "rgba(26, 175, 58, 0.8)",   width: 5 },  },
                values: "Missouri"	  
	    }]
         }, {
            heading: "Denver and Rocky Mountain National Park, Aug 2022",
            classes: [{
                label: "Colorado",
                symbol: {type: "simple-marker", color: "rgba(220, 73, 29, 1)",  outline: { color: "rgba(242, 104, 63, 0.8)",  width: 5 }  },
                values: "Colorado"	  
	    }]
         }, {
            heading: "Austin, Jun 2023",
            classes: [{
                label: "Texas",
                symbol: {type: "simple-marker", color: "rgba(148, 223, 0, 1)",  outline: { color: "rgba(182, 238, 70, 0.8)",  width: 5 }  },
                values: "Texas"	  
	    }]
         }, {
            heading: "Waterton Lakes and Glacier National Parks, Aug 2023",
            classes: [{
                label: "Alberta and Montana",
                symbol: {type: "simple-marker", color: "rgba(244, 119, 8, 1)",  outline: { color: "rgba(232, 140, 60, 0.8)",  width: 5 }  },
                values: ["Alberta", "Montana"]	  
	    }]
         }, {
            heading: "Bavaria and Northeast Italy, Nov 2023",
            classes: [{
                label: "Bavaria, Tyrol, Trention-South Tyrol, Veneto, and Friuli-Venezia Giulia",
                symbol: {type: "simple-marker", color: "rgba(41, 157, 186, 1)", outline: { color: "rgba(75, 190, 219, 0.8)",  width: 5 }  },
                values: ["Bavaria", "Tyrol", "Trention-South Tyrol", "Veneto", "Friuli-Venezia Giulia"]	  
	    }]
	  }]
	});


	// load in the geoJSON travel point layer
	const geojsonLayer = new GeoJSONLayer({
		url: geojsonurl,
		featureReduction: clusterConfig,
		popupTemplate: template,
		title: "Travel Destinations by Trip and State",
		renderer: renderer
	});

	// create a new map object with the openstreetmap baselayer 
	const map = new Map({
		basemap: "topo-vector",
		layers: [geojsonLayer]
	});

	// set the view position for the map
	const view = new MapView({
		container: "viewDiv",
		map: map,
		zoom: 5,
		center: [-98.7996, 39.9930]
	});

       // Limit zooming to prevent incorrect aggregations between clusters
       view.constraints = {
         minZoom: 5,
         maxZoom: 19
        };
	
	// Set Bookmarks to easily navigate to different travel destinations
        const bookmarks = new Bookmarks({
          view: view,
          bookmarks: [
            new Bookmark({
              name: "Monument Valley, Feb 2022",
	      thumbnail: "https://i.imgur.com/y4VOhVh.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -12492283.6535338,
                  ymin: 4211729.40905857,
                  xmax: -12156768.6993028,
                  ymax: 4482380.95589102
                }
              }
            }),
            new Bookmark({
              name: "Johnson's Shut Ins, May 2022",
	      thumbnail: "https://i.imgur.com/RhRyi4b.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -10113901.611936,
                  ymin: 4513459.214434251,
                  xmax: -10110033.3878775,
                  ymax: 4516579.61432023
                }
              }
            }),
            new Bookmark({
              name: "Denver and Rocky Mountain National Park, Aug 2022",
	      thumbnail: "https://i.imgur.com/EEA8ppT.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -11812438.8418179,
                  ymin: 4785441.5498655,
                  xmax: -11640655.1852516,
                  ymax: 4924015.14184372
                }
              }
            }),
            new Bookmark({
              name: "Austin, June 2023",
	      thumbnail: "https://i.imgur.com/XT2Cvom.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -10904800.9192392,
                  ymin: 3529678.25750133,
                  xmax: -10867025.2936679,
                  ymax: 3560150.91263788
                }
              }
            }),
            new Bookmark({
              name: "Waterton Lakes and Glacier National Parks, Aug 2023",
	      thumbnail: "https://i.imgur.com/xijfzut.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -12746990.8621478,
                  ymin: 6164763.2107844,
                  xmax: -12566862.6426801,
                  ymax: 6310068.15356655
                }
              }
            }),
            new Bookmark({
              name: "Bavaria and Northeast Italy, Nov 2023",
	      thumbnail: "https://i.imgur.com/Eg0xBWI.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: 868728.175506883,
                  ymin: 5647081.72596466,
                  xmax: 1727646.45833829,
                  ymax: 6339949.68585575
                }
              }
            }),
          ]
        });

	const bkExpand = new Expand({
          view: view,
          content: bookmarks
        });	

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


     view.ui.add(bkExpand, "top-right");
     view.ui.add(fullscreen, "top-left");
     view.ui.add(homeWidget, "top-left");
     view.ui.add(legendExpand, "bottom-right");
     
     });
