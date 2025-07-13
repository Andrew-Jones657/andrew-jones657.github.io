	require([
		"esri/Map", 
		"esri/Basemap", 
		"esri/widgets/Home", 
		"esri/layers/GeoJSONLayer",
		"esri/layers/MediaLayer",
		"esri/layers/support/ImageElement",
		"esri/layers/support/ExtentAndRotationGeoreference",
		"esri/renderers/UniqueValueRenderer", 
		"esri/symbols/SimpleFillSymbol",
        	"esri/geometry/Extent",
        	"esri/geometry/SpatialReference",
        	"esri/widgets/Slider",
	        "esri/widgets/Legend",
		"esri/widgets/Fullscreen", 
		"esri/widgets/Expand",
		"esri/views/MapView",
		"esri/core/reactiveUtils"
		], (Map, Basemap, Home, GeoJSONLayer, MediaLayer, ImageElement, ExtentAndRotationGeoreference, UniqueValueRenderer, SimpleFillSymbol, Extent, SpatialReference, Slider, Legend, Fullscreen, Expand, MapView, reactiveUtils) => {

	// Declare a variable for the layer view that will later be used to feature filters by year
        let yearLayerView;

	// Link to geoJSON file containing historical social institutions
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
                symbol: {type: "simple-marker", color: "rgba(255, 0, 0, 1)",  outline: { color: "rgba(0, 0, 0, 1)",  width: 1 }  },
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
                symbol: {type: "simple-marker", color: "rgba(230, 230, 0, 1)", outline: { color: "rgba(0, 0, 0, 1)",  width: 1 }  },
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

        // --------------- This section focuses on adding in the georeferenced map to the back ground ------------------- //
        // image information used to create image elements to be
        // added to the media layer
        const imageInfos = [
          {
            name: "covington1909",
            title: "Georeferenced Basemap",
            extent: {
                xmin: -84.565464,
                ymin: 39.030186,
                xmax: -84.483335,
                ymax: 39.098458
            }
          }
        ];

        // create image elements for each image
        function createImageElement(name, box) {
          const imageElement = new ImageElement({
            image: `https://i.imgur.com/IBt0viU.png`,
            georeference: new ExtentAndRotationGeoreference({
              extent: new Extent({
                spatialReference: {
                  wkid: 4269, 
                },
                xmin: box.xmin,
                ymin: box.ymin,
                xmax: box.xmax,
                ymax: box.ymax
              })
            })
          });
          return imageElement;
        }

        let imageElements = [];
        // loop through images and set up ImageElement object for MediaLayer.
        imageInfos.forEach((image, i) => {
          const elementDiv = document.createElement("div");
          elementDiv.classList.add("elementDiv");

          const imageElement = {
            name: image.name,
            title: image.title,
            element: createImageElement(image.name, image.extent)
          };
          imageElements.push(imageElement);

          // create calcite checkboxes to allow users to add and remove
          // image elements from the MediaLayer.
          const label = document.createElement("calcite-label");
          label.layout = "inline-space-between";
          label.disableSpacing = true;
          label.innerHTML = image.title;
          const checkBox = document.createElement("calcite-checkbox");
          checkBox.name = image.name;
          checkBox.value = image.name;
          checkBox.checked = true;

          // Remove the image element from the MediaLayer if it exists
          // Add the image element to the layer if it does not exist in the layer.source.elements.
          checkBox.addEventListener("calciteCheckboxChange", (event) => {
            const selectedImageElement = imageElements.find(
              (item) => item.name === event.target.name
            );
            if (checkBox.checked) {
              layer.source.elements.add(selectedImageElement.element);
            } else {
              layer.source.elements.remove(selectedImageElement.element);
            }
          });

          label.appendChild(checkBox);
          const visibleDiv = document.createElement("div");
          visibleDiv.classList.add("leftPadding", "rightPadding");
          visibleDiv.appendChild(label);
          document.getElementById("elementsDiv").appendChild(visibleDiv);

          const slider = new Slider({
            min: 0,
            max: 1,
            precision: 2,
            container: document.createElement("div"),
            values: [1],
            label: image.name
          });

          slider.on("thumb-drag", (event) => {
            const selectedImageElement = imageElements.find(
              (item) => item.name === slider.label
            );
            selectedImageElement.element.opacity = slider.values[0];
          });

          const sliderLabel = document.createElement("calcite-label");
          sliderLabel.layout = "inline";
          sliderLabel.innerHTML = " ";
          sliderLabel.appendChild(slider.container);

          const sliderDiv = document.createElement("div");
          sliderDiv.classList.add("leftPadding");
          sliderDiv.appendChild(sliderLabel);
          document.getElementById("elementsDiv").appendChild(sliderDiv);
        });

        // MediaLayer - add imageElements
        const layer = new MediaLayer({
          source: [
            imageElements[0].element
          ],
          opacity: 1,
          title: "Covington",
          blendMode: "normal"
        });
	        // --------------- End georeferencing section ------------------- //

	// load in the geoJSON covington institutions point layer
	const geojsonLayer = new GeoJSONLayer({
		url: geojsonurl,
		popupTemplate: template,
		title: "Covington's German Element, 1861 - 1920",
		renderer: renderer
	});


        const map = new Map({
          basemap: "dark-gray",
          layers: [layer, geojsonLayer]
        });

        const view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 14,
          center: [-84.509852, 39.081289],
        });



	// ----------------------- This section is focused on creating the filter to limit the geojsonLayer view by Year ---------------------------- // 
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
	
	// this is where the app fails to load
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
          view.ui.add("titleDiv", "bottom-left");
	  });

	// ----------------------- End filter section ---------------------------- // 

	// enable users to hover over points and automatically open popups 
	view.on("pointer-move", function(event) {
  	  view.hitTest(event).then(function(response) {
    	    if (response.results.length) {
      		const filteredResults = response.results.filter(result => result.graphic.layer === geojsonLayer);

      		if (filteredResults.length > 0) {
        	  const graphic = filteredResults[0].graphic;
          	    view.popup.open({
            		location: graphic.geometry.centroid,
            		features: [graphic]
          	    });
      		} else {
        	  view.popup.close();
      		}
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

        view.ui.add(
          new Expand({
            view: view,
            expanded: true,
            content: document.getElementById("infoDiv")
          }),
          "top-right"
        );

        document
          .getElementById("layerBlending")
          .addEventListener("calciteSwitchChange", () => {
            layer.blendMode =
              layer.blendMode === "normal" ? "luminosity" : "normal";
          });


      });
