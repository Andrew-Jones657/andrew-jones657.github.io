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
       const geojsonurl = "https://raw.githubusercontent.com/Andrew-Jones657/andrew-jones657.github.io/main/files/travelmap/Travel22_24.geojson";

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
        field: "Vacation_Identifier",
    	uniqueValueGroups: [{
            heading: "Ireland, June - July 2018",
            classes: [{
                label: "Ireland and Northern Ireland",
                symbol: { type: "simple-marker", color: "rgba(7, 119, 15, 1)", outline: { color: "rgba(50, 172, 57, 0.8)", width: 5 }, },
                values: "2018 Ireland"
            }]
         }, {
            heading: "Salt Lake City Utah, July 2021",
            classes: [{
                label: "Utah",
                symbol: { type: "simple-marker", color: "rgba(224, 230, 51, 1)", outline: { color: "rgba(237, 241, 117, 0.8)", width: 5 }, },
                values: "2021 Jul Utah"
            }]
         }, {
            heading: "Columbia Missouri, 2021 - 2023",
            classes: [{
                label: "Missouri",
                symbol: { type: "simple-marker", color: "rgba(206, 21, 15, 1)", outline: { color: "rgba(230, 84, 79, 0.8)", width: 5 }, },
                values: "2021-2023 Columbia Missouri"
            }]
         }, {
            heading: "Monument Valley, February 2022",
            classes: [{
                label: "Arizona and Utah",
                symbol: { type: "simple-marker", color: "rgba(79, 111, 190, 1)", outline: { color: "rgba(123, 159, 226, 0.8)", width: 5 }, },
                values: "2022 Feb Monument Valley"
            }]
         }, {
            heading: "Johnson's Shut-Ins State Park, May 2022",
            classes: [{
                label: "Missouri",
                symbol: { type: "simple-marker", color: "rgba(12, 122, 36, 1)",  outline: { color: "rgba(26, 175, 58, 0.8)",   width: 5 },  },
                values: "2022 May Missouri"	  
	    }]
         }, {
            heading: "Denver and Rocky Mountain National Park, August 2022",
            classes: [{
                label: "Colorado",
                symbol: {type: "simple-marker", color: "rgba(220, 73, 29, 1)",  outline: { color: "rgba(242, 104, 63, 0.8)",  width: 5 }  },
                values: "2022 Aug Colorado"	  
	    }]
         },  {
            heading: "Mammoth Cave National Park, February 2023",
            classes: [{
                label: "Colorado",
                symbol: {type: "simple-marker", color: "rgba(150, 75, 0, 1)",  outline: { color: "rgba(217, 138, 60, 0.8)",  width: 5 }  },
                values: "2022 Feb Kentucky"	  
	    }]
         }, {
            heading: "Austin, June 2023",
            classes: [{
                label: "Texas",
                symbol: {type: "simple-marker", color: "rgba(148, 223, 0, 1)",  outline: { color: "rgba(182, 238, 70, 0.8)",  width: 5 }  },
                values: "2023 Jun Texas"	  
	    }]
         }, {
            heading: "Waterton Lakes and Glacier National Parks, August 2023",
            classes: [{
                label: "Alberta and Montana",
                symbol: {type: "simple-marker", color: "rgba(244, 119, 8, 1)",  outline: { color: "rgba(232, 140, 60, 0.8)",  width: 5 }  },
                values: "2023 Aug Waterton Lakes and Glacier National Park" 
	    }]
         }, {
            heading: "Mammoth Cave National Park, Sep 2023",
            classes: [{
                label: "Kentucky",
                symbol: {type: "simple-marker", color: "rgba(150, 192, 77, 1)",  outline: { color: "rgba(187, 229, 116, 0.8)",  width: 5 }  },
                values: "2023 Sep Kentucky" 
	    }]
         }, {
            heading: "Great Smoky Mountains National Park and Cumberland Falls State Resort Park, October 2023",
            classes: [{
                label: "Kentucky and Tennessee",
                symbol: {type: "simple-marker", color: "rgba(232, 152, 21, 1)",  outline: { color: "rgba(233, 167, 61, 0.8)",  width: 5 }  },
                values: "2023 Oct Gatlinburg" 
	    }]
         }, {
            heading: "Bavaria and Northeast Italy, November 2023",
            classes: [{
                label: "Bavaria, Tyrol, Trention-South Tyrol, Veneto, and Friuli-Venezia Giulia",
                symbol: {type: "simple-marker", color: "rgba(41, 157, 186, 1)", outline: { color: "rgba(75, 190, 219, 0.8)",  width: 5 }  },
                values: "2023 Nov Europe"
	    }]
	  }, {
            heading: "San Francisco and San Jose, January 2024",
            classes: [{
                label: "California",
                symbol: {type: "simple-marker", color: "rgba(108, 34, 216, 1)", outline: { color: "rgba(158, 105, 239, 0.8)",  width: 5 }  },
                values: "2024 Jan California"
	    }]
	  }, {
            heading: "Montana and Yellowstone National Park, August 2024",
            classes: [{
                label: "Montana and Wyoming",
                symbol: {type: "simple-marker", color: "rgba(14, 191, 149, 1)", outline: { color: "rgba(64, 232, 193, 0.8)",  width: 5 }  },
                values: "2024 Aug Montana"
	    }]
	  }, {
            heading: "Pennyrile State Forest, September 2024",
            classes: [{
                label: "Kentucky",
                symbol: {type: "simple-marker", color: "rgba(121, 153, 6, 1)", outline: { color: "rgba(188, 228, 43, 0.8)",  width: 5 }  },
                values: "2024 Sep Kentucky"
	    }]
	  }, {
            heading: "Denver, November 2024",
            classes: [{
                label: "Colorado",
                symbol: {type: "simple-marker", color: "rgba(38, 197, 215, 1)", outline: { color: "rgba(99, 218, 231, 0.8)",  width: 5 }  },
                values: "2024 Nov Colorado"
	    }]
	  }, {
            heading: "Gatlinburg, Decmember 2024",
            classes: [{
                label: "Tennessee",
                symbol: {type: "simple-marker", color: "rgba(41, 121, 197, 1)", outline: { color: "rgba(118, 162, 203, 0.8)",  width: 5 }  },
                values: "2024 Dec Tennessee"
	    }]
	  }, {
            heading: "Warren County Kentucky Area, 2024",
            classes: [{
                label: "Kentucky",
                symbol: {type: "simple-marker", color: "rgba(115, 53, 170, 1)", outline: { color: "rgba(173, 111, 228, 0.8)",  width: 5 }  },
                values: "2024-2025 Bowling Green Kentucky Area"
	    }]
	  }, {
            heading: "San Francisco Bay Area, Jan 2025",
            classes: [{
                label: "California",
                symbol: {type: "simple-marker", color: "rgba(239, 20, 232, 1)", outline: { color: "rgba(236, 110, 232, 0.8)",  width: 5 }  },
                values: "2025 Jan California"
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
              name: "Ireland, June-July 2018",
	      thumbnail: "https://i.imgur.com/OirBiYh.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -1446179.867474,
                  ymin: 6661297.18959829,
                  xmax: -252186.095842784,
                  ymax: 7452334.96582055
                }
              }
            }),
            new Bookmark({
              name: "Salt Lake City, July 2021",
	      thumbnail: "https://i.imgur.com/mc8sf89.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -12540252.9493886,
                  ymin: 4879864.84955465,
                  xmax: -12339934.0352954,
                  ymax: 5012578.96591306
                }
              }
            }),
            new Bookmark({
              name: "Columbia Missouri, 2021 - 2023",
	      thumbnail: "https://i.imgur.com/sSZdf33.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -10351096.1640893,
                  ymin: 4660210.35511061,
                  xmax: -10190841.0328148,
                  ymax: 4766381.64819734
                }
              }
            }),
            new Bookmark({
              name: "Monument Valley, February 2022",
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
              name: "Denver and Rocky Mountain National Park, August 2022",
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
              name: "Mammoth Cave, Februray 2023",
	      thumbnail: "https://i.imgur.com/Ms9MIMb.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -9597855.93245768,
                  ymin: 4456594.8794708,
                  xmax: -9584090.12150088,
                  ymax: 4465714.92410243
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
              name: "Waterton Lakes and Glacier National Parks, August 2023",
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
              name: "Mammoth Cave, September 2023",
	      thumbnail: "https://i.imgur.com/QYOw6fb.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    wkid: 102100
                  },
                  xmin: -9590765.76606388,
                  ymin: 4460829.00376561,
                  xmax: -9579488.81372807,
                  ymax: 4468300.14432784
                }
              }
            }),
            new Bookmark({
              name: "Great Smoky Mountains National Park and Cumberland Falls State Resort Park, October 2023",
	      thumbnail: "https://i.imgur.com/GDpRfP9.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -9515639.71978395,
                  ymin: 4193747.02132186,
                  xmax: -9140041.75585936,
                  ymax: 4442585.98949388
                }
              }
            }),
            new Bookmark({
              name: "Bavaria and Northeast Italy, November 2023",
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
            new Bookmark({
              name: "San Jose and San Francisco, January 2024",
	      thumbnail: "https://i.imgur.com/ZanigGE.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -13707504.4749126,
                  ymin: 4437568.45815337,
                  xmax: -13507185.5608195,
                  ymax: 4570282.57451178
                }
              }
            }),
            new Bookmark({
              name: "Montana and Yellowstone National Park, August 2024",
	      thumbnail: "https://i.imgur.com/HFcdJOa.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -12584894.4551253,
                  ymin: 5456884.07267967,
                  xmax: -12095834.6062651,
                  ymax: 5780893.14582031
                }
              }
            }),
            new Bookmark({
              name: "Pennyrile State Forest, September 2024",
	      thumbnail: "https://i.imgur.com/o6XmirX.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -9763826.70905225,
                  ymin: 4445089.57748971,
                  xmax: -9752814.06028681,
                  ymax: 4452385.61319501
                }
              }
            }),
            new Bookmark({
              name: "Denver, November 2024",
	      thumbnail: "https://i.imgur.com/hDUKjVZ.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -11757385.1299845,
                  ymin: 4783865.70565459,
                  xmax: -11603540.203961,
                  ymax: 4885790.14701785
                }
              }
            }),
            new Bookmark({
              name: "Gatlinburg, December 2024",
	      thumbnail: "https://i.imgur.com/6Ecaden.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -9322549.96006393,
                  ymin: 4233439.59189732,
                  xmax: -9259535.07836469,
                  ymax: 4275187.84307971
                }
              }
            }),
            new Bookmark({
              name: "Warren County Kentucky Area, 2024",
	      thumbnail: "https://i.imgur.com/49OSMA2.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -9665815.09337305,
                  ymin: 4399662.24955955,
                  xmax: -9567354.340718,
                  ymax: 4464893.89203204
                }
              }
            }),
            new Bookmark({
              name: "San Francisco Bay Area, January 2025",
	      thumbnail: "https://i.imgur.com/4j3574q.jpg",
              viewpoint: {
                targetGeometry: {
                  type: "extent",
                  spatialReference: {
                    latestWkid: 3857,
                    wkid: 102100
                  },
                  xmin: -13753615.8295878,
                  ymin: 4432771.44924997,
                  xmax: -13433105.5670388,
                  ymax: 4645114.03542342
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
